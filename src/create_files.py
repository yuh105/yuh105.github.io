def create(write_file, read_file_path):
    with open(read_file_path, mode='r') as rfile:
        while True:
            line = rfile.readline()
            if not line:
                break
            wfile.write(line.strip())


if __name__ == '__main__':
    write_html = './../index.html'
    index_html = 'files/index.html'

    write_css = './../css/style.css'
    css = 'files/style.css'

    write_js = './../js/index.js'
    models_js = 'files/models.js'
    myscript_js = 'files/myscript.js'
    nav_butons_js = 'files/nav_buttons.js'
    create_square_in_square_js = 'files/createSquareInSquare.js'

    with open(write_html, mode='w') as wfile:
        create(wfile, index_html)

    with open(write_css, mode='w') as wfile:
        create(wfile, css)

    with open(write_js, mode='w') as wfile:
        create(wfile, models_js)
        create(wfile, myscript_js)
        create(wfile, nav_butons_js)
        create(wfile, create_square_in_square_js)

