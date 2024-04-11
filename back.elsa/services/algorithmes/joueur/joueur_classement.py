def classement_joueurs(matchs):
    joueurs_scores = {}

    for match in matchs:
        for joueur in match['joueurs']:
            joueur_nom = joueur['Nom'] + ' ' + joueur['Prenom']  # Utilisation du nom et du prénom
            score = joueur['score']
            if joueur_nom in joueurs_scores:
                joueurs_scores[joueur_nom] += score
            else:
                joueurs_scores[joueur_nom] = score

    joueurs_tries = sorted(joueurs_scores.items(), key=lambda x: x[1], reverse=True)
    return joueurs_tries[:3]  # Retourne uniquement les trois premiers joueurs classés


def afficher_classement_joueurs(joueurs_tries):
    print("Classement des joueurs :")
    for i, joueur in enumerate(joueurs_tries, 1):
        joueur_id, score = joueur  # Dépaquetage du tuple
        print(f"{i}. Joueur {joueur_id} - Score : {score}")
