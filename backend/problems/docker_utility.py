import subprocess
import os
import shutil

DOCKER_IMAGE = 'cpp_container'
CONTAINER_NAME = 'code_executor_container'
CODE_DIR = 'code_dir'
OUTPUT_FILE = 'output.txt'
ERROR_FILE = 'error.txt'

def ensure_container_running():
    """Ensure the Docker container is always running in the background."""
    try:
        # Check if the container exists
        subprocess.run(['sudo', 'docker', 'inspect', CONTAINER_NAME], capture_output=True, text=True, check=True)
        # If exists, start it if not running
        result = subprocess.run(['sudo', 'docker', 'inspect', '-f', '{{.State.Running}}', CONTAINER_NAME], capture_output=True, text=True, check=True)
        if result.stdout.strip() != 'true':
            subprocess.run(['sudo', 'docker', 'start', CONTAINER_NAME], check=True)
    except subprocess.CalledProcessError:
        # If the container does not exist, create and start it
        subprocess.run(['sudo', 'docker', 'run', '-d', '--name', CONTAINER_NAME, DOCKER_IMAGE], check=True)

def create_files_locally(code, input_data):
    """Create the user's code and input files locally."""
    if os.path.exists(CODE_DIR):
        shutil.rmtree(CODE_DIR)
    os.makedirs(CODE_DIR)

    with open(os.path.join(CODE_DIR, 'code.cpp'), 'w') as code_file:
        code_file.write(code)

    with open(os.path.join(CODE_DIR, 'input.txt'), 'w') as input_file:
        input_file.write(input_data)

def remove_code_dir_in_container():
    """Remove the code_dir directory inside the Docker container if it exists."""
    try:
        subprocess.run(['sudo', 'docker', 'exec', CONTAINER_NAME, 'rm', '-rf', '/code_dir'], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error removing /code_dir in container: {e}")
        raise

def copy_files_to_container():
    """Copy the user's code and input files into the Docker container."""
    remove_code_dir_in_container()
    subprocess.run(['sudo', 'docker', 'cp', CODE_DIR, f'{CONTAINER_NAME}:/'], check=True)

def compile_code():
    """Compile the code within the Docker container."""
    try:
        subprocess.run(['sudo', 'docker', 'exec', CONTAINER_NAME, 'g++', '/code_dir/code.cpp', '-o', '/code_dir/code.out'], check=True, stderr=subprocess.PIPE)
        return True
    except subprocess.CalledProcessError as e:
        with open(ERROR_FILE, 'w') as error_file:
            error_file.write(e.stderr.decode())
        return False

def execute_code():
    """Execute the compiled code in the Docker container."""
    try:
        subprocess.run(f'sudo docker exec {CONTAINER_NAME} /bin/sh -c "/code_dir/code.out < /code_dir/input.txt > /code_dir/output.txt"', check=True, shell=True)
        return True
    except subprocess.CalledProcessError as e:
        with open(ERROR_FILE, 'w') as error_file:
            if e.stderr:
                error_file.write(e.stderr.decode())
            else:
                error_file.write(f"Command '{e.cmd}' returned non-zero exit status {e.returncode}")
        return False

def retrieve_output():
    """Retrieve the output file from the Docker container and read its contents."""
    try:
        subprocess.run(['sudo', 'docker', 'cp', f'{CONTAINER_NAME}:/code_dir/output.txt', OUTPUT_FILE], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error retrieving output file from container: {e}")
        raise

    with open(OUTPUT_FILE, 'r') as output_file:
        return output_file.read().strip()  # Ensure to strip any extra whitespace or newline characters

def copy_output_to_host(output_path):
    """Copy the output file from the Docker container to the host."""
    try:
        subprocess.run(['sudo', 'docker', 'cp', f'{CONTAINER_NAME}:/code_dir/output.txt', output_path], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error copying output file to host: {e}")
        raise

def handle_errors():
    """Handle errors such as compilation or runtime errors."""
    if os.path.exists(ERROR_FILE):
        with open(ERROR_FILE, 'r') as error_file:
            return error_file.read()
    return None

def clean_up():
    """Clean up local files after execution."""
    if os.path.exists(CODE_DIR):
        shutil.rmtree(CODE_DIR)
    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)
    if os.path.exists(ERROR_FILE):
        os.remove(ERROR_FILE)

def main(code, input_data, output_path):
    ensure_container_running()
    create_files_locally(code, input_data)
    copy_files_to_container()

    if not compile_code():
        error_message = handle_errors()
        print(f"Compilation Error: {error_message}")
        clean_up()
        return

    if not execute_code():
        error_message = handle_errors()
        print(f"Runtime Error: {error_message}")
        clean_up()
        return

    output = retrieve_output()
    print(f"Program Output: {output}")

    copy_output_to_host(output_path)

    clean_up()


def evaulate_code_in_docker(code , langauge , Test):
    if langauge == "c++":
        input_data = Test.input
        create_files_locally(code, input_data)
        copy_files_to_container()
        
        if not compile_code():
            error_message = handle_errors()
            print(f"Compilation Error: {error_message}")
            clean_up()
            return

        if not execute_code():
            error_message = handle_errors()
            print(f"Runtime Error: {error_message}")
            clean_up()
            return

        output = retrieve_output()
        clean_up()

        if output == Test.output:
            verdict = "AC"
        else:
            verdict = "WA"
        return verdict
    else:
        print("language not supported.\n")
