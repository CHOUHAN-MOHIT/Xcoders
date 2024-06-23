import os
import subprocess

def write_cpp_code_in_file(code):
    with open('code.cpp' , 'w') as code_file:
        code_file.write(code)

def execute_cpp(input): 
    # create a pipe to a child process 
    data, temp = os.pipe() 
    # write to STDIN as a byte object(convert string to bytes with encoding utf8) 
    os.write(temp, bytes(input, "utf-8")) 
    os.close(temp) 
  
    # store output of the program as a byte string in s 
    s = subprocess.check_output("g++ code.cpp -o out", shell=True)
    s = subprocess.check_output(".\out.exe", stdin=data , shell=True) 
    # decode s to a normal string 
    return s.decode("utf-8")

def evaulate_code(code , langauge , Test):
    input = Test.input
    if langauge == "c++":
        write_cpp_code_in_file(code)
        output = execute_cpp(input)
        print(output)
    #compare output with expected output
    if output == Test.output:
        verdict = "AC"
    else:
        verdict = "WA"
    return verdict