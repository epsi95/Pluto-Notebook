from flask import Flask, request, render_template

from contextlib import redirect_stdout
import io
import ast

app = Flask(__name__)

def evalate_code(code):
    parsed = ast.parse(code)
    f = io.StringIO()
    
    with redirect_stdout(f):
        try:
            for n in parsed.body:
                if type(n) == ast.Expr:
                    # use eval
                    result = eval(compile(ast.Expression(n.value), "<string>", "eval"), globals())
                    if result:
                        print(result)
                else:
                    # use exec
                    exec(compile(ast.Module(body=[n], type_ignores=[]), "<string>", "exec"), globals())
        except Exception as e:
            print('Error!')
            print(e.__class__.__name__ + ' : ')
            print(e)
                
    return f.getvalue()

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')
    
@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    code = data['command']
    return {'result': evalate_code(code)}

if __name__ == '__main__':
    app.run(port=8080, debug=True)