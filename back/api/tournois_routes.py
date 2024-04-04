from flask import Blueprint, request, jsonify
from back.services.algorithmes.tournois import tournois_recherche
from back.services.algorithmes.tournois import tournois_modification
from back.services.algorithmes.tournois import tournois_insertion

tournois_bp = Blueprint('tournois', __name__)


@tournois_bp.route('/', methods=['GET'])
def get_all():
    result = tournois_recherche.tout_les_tournois()
    return jsonify(result)


@tournois_bp.route('/<string:place_name>', methods=['GET'])
def get_by_place_name(place_name):
    result = tournois_recherche.rechercher_tournois_par_lieu(place_name)
    return jsonify(result)


@tournois_bp.route('/', methods=['POST'])
def add_tournoi():
    result = request.json
    tournois_insertion.insertion_tournoi(result)
    return f"Tu as ajouté un tournoi : {request.json}"


@tournois_bp.route('/tournois_joueur/<string:numero>', methods=['GET'])
def get_tournois_by_numero_joueur(numero):
    result = tournois_recherche.rechercher_tournois_par_numero(numero)
    return jsonify(result)


@tournois_bp.route('/', methods=['PUT'])
def update_tournois():
    modification = request.json
    id_tournois = modification.get('_id')  # Supposons que l'identifiant soit fourni dans le document JSON
    document_modification = modification.get('modification')  # Supposons que les modifications soient fournies dans un champ "modification" dans le JSON
    if not id_tournois:
        return jsonify({"error": "L'identifiant du tournois est manquant"})
    if not document_modification:
        return jsonify({"error": "Les données de modification sont manquantes"})
    tournois_modification.modifier_tournois(id_tournois, document_modification)
    return jsonify({"message": "tournois mis à jour avec succès"})


@tournois_bp.route('/<string:id_tournoi>', methods=['PUT'])
def insertion_joueur_tournoi(id_tournoi):
    data = request.json
    numero_inscription = data.get('NumeroInscription')
    nom = data.get('Nom')
    prenom = data.get('Prenom')
    result_messages = tournois_insertion.insertion_joueur_tournoi(id_tournoi, numero_inscription, nom, prenom)
    return jsonify({"messages": result_messages})
