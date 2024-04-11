from back.services.algorithmes.tournois import tournois_recherche
def calculer_classement_general():
    classement = {}
    tournois = tournois_recherche.tout_les_tournois()

    for tournoi in tournois:
        for match in tournoi['matchs']:
            vainqueur_nom = match['vainqueur']

            if vainqueur_nom != 'match_nul':
                if vainqueur_nom not in classement:
                    classement[vainqueur_nom] = 0
                classement[vainqueur_nom] += 1

    # Trier le classement en fonction du nombre de victoires
    classement = dict(sorted(classement.items(), key=lambda item: item[1], reverse=True))

    return classement

def afficher_classement(classement):
    classement_json = []
    for i, (nom, victoires) in enumerate(classement.items(), start=1):
        classement_json.append({"Top": i, "Nom": nom, "Victoires": victoires})
    return classement_json


