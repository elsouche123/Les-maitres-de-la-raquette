from flask import Flask
from flask_cors import CORS
from tournois_routes import tournois_bp
from joueur_routes import joueur_bp
from equipe_route import equipe_bp

app = Flask(__name__)
cors = CORS(app)

app.register_blueprint(joueur_bp, url_prefix='/api/joueur')
app.register_blueprint(tournois_bp, url_prefix='/api/tournois')
app.register_blueprint(equipe_bp, url_prefix='/api/equipe')


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True)
