from flask import Blueprint, request, jsonify
import services.algorithmes.nombre_participants.mele_general as mg

calcule_bp = Blueprint('calcule', __name__)


@calcule_bp.route('/mele_general/max_participant/<string:heure>/<int:nb_table>', methods=['GET'])
def calc_max_participant(heure, nb_table):
    max_participant = {
        "maxParticipant": mg.calcul_max_participants(heure, nb_table)
    }
    return jsonify(max_participant)


@calcule_bp.route('/mele_general/max_temps/<int:max_participant>/<int:nb_table>', methods=['GET'])
def calc_max_temps(max_participant, nb_table):
    max_temps = {
        "dureeEstime": mg.calcul_temps_max(max_participant, nb_table)
    }
    print(max_temps)
    return jsonify(max_temps)
