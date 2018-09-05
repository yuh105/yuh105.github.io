def create_from_html(write_file, read_file_path):
    with open(read_file_path, mode='r') as rfile:
        wfile.write('function ' + read_file_path.split('/')[-1].split('.')[0] + '() {')
        wfile.write("let html = '';")
        pre_flag = False
        while True:
            line = rfile.readline()
            if not line:
                break

            if '<pre>' in line:
                pre_flag = True
                print(line)
            if '</pre>' in line:
                pre_flag = False
                print(line)

            if pre_flag:
                wfile.write("html += '" + line.strip() + "\\n';")
            else:
                wfile.write("html += '" + line.strip() + "';")
        wfile.write("document.write(html);")
        wfile.write('}')


def create_from_jcss(write_file, read_file_path):
    with open(read_file_path, mode='r') as rfile:
        while True:
            line = rfile.readline()
            if not line:
                break
            wfile.write(line.strip())


if __name__ == '__main__':

    write_css = './../css/style.css'
    css = 'files/style.css'

    write_js = './../js/index.js'
    models_js = 'files/models.js'
    myscript_js = 'files/myscript.js'
    nav_butons_js = 'files/nav_buttons.js'
    create_square_in_square_js = 'files/createSquareInSquare.js'

    with open(write_css, mode='w') as wfile:
        create_from_jcss(wfile, css)

    with open(write_js, mode='w') as wfile:
        create_from_jcss(wfile, models_js)
        create_from_jcss(wfile, myscript_js)
        create_from_jcss(wfile, nav_butons_js)
        create_from_jcss(wfile, create_square_in_square_js)

