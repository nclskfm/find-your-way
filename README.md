# Find your way

[English below](#Find-your-way-English)
 

## Inhaltsverzeichnis

1. [Einleitung](#Einleitung)
2. [Algorithmus](#Algorithmus)
3. [Starten](#Starten)
4. [Funktionen](#Funktionen)
5. [Beispieldaten](#Beispieldaten)
6. [Lösung der Challenge](#Lösung-der-Challenge)

  

## Einleitung
Find your way ist eine Angular-Applikation, um ein TSP (_Traveling Salesman Problem_; Rundreise-Problem) zu lösen. Die Daten werden mittels einer CSV-Datei hochgeladen.

Die Web-Applikation wurde im Rahmen der [get in IT Coding Challenge](https://www.get-in-it.de/magazin/events/challenges/coding-challenge-2020) erstellt.


## Algorithmus
Der gewählte Algorithmus basiert auf die [Branch and Bound](https://de.wikipedia.org/wiki/Branch-and-Bound)-Methode. Diese Methode wurde genommen, weil sie effekt ganzzahlige Optimierungsprobleme lösen kann. Zwar ist diese Methode relativ speicher aufwändig, jedoch sollte das für bis zu 40 Knoten kein Problem sein. Außerdem ist der Algorithmus relativ einfach zu verstehen und zu implementieren.   

## Starten
1. Um die Angular-Applikation zu starten, muss zuerst ein API-Key für google maps erstellt werden (siehe [hier](https://developers.google.com/maps/documentation/javascript/get-api-key). Dieser Key muss in die Datei _/src/API_KEY.txt_ gespeichert werden.
2. Danach kann der Docker-Container erstellt werden mit `docker build -t find-your-way .` und
3. gestartet werden mit `docker run -it -p 80:80 find-your-way`.
4. Anschließend startet die App unter [localhost:80](localhost:80).


## Funktionen
Find-your-way hat folgende Funktionen:

 - CSV-Upload (siehe [Beispieldaten](#Beispieldaten))
 - Visualisierung der Punkte auf einer Karte
 - Visualisierung der kürzesten Strecke auf einer Karte
 - Verlinkung der Route zwischen zwei Städten auf Google Maps (z.B. von Nürnberg nach Stuttgart).
 - Verlinkung der kompletten Route mit Zwischenstopps auf Google Maps (Google Maps unterstützt nur Routen mit max. neun Zwischenstopps, deswegen wird die Route automatisch aufgeteilt) 

## Beispieldaten

So sollte die CSV-Datei aussehen (im Verzeichnis ist auch eine Datei _example-data.csv_):
**Hinweis**: Die Spalten Straße, Hausnummer, PLZ und Ort können leer sein.

|Nummer|Standort                    |Straße                   |Hausnummer|PLZ  |Ort                    |Breitengrad|Längengrad|
|------|----------------------------|-------------------------|----------|-----|-----------------------|-----------|----------|
|1     |Ismaning/München (Hauptsitz)|Robert-Bürkle-Straße     |1         |85737|Ismaning               |48.229035  |11.686153 |
|2     |Berlin                      |Wittestraße              |30        |13509|Berlin                 |52.580911  |13.293884 |
|3     |Braunschweig                |Mittelweg                |7         |38106|Braunschweig           |52.278748  |10.524797 |
|4     |Bretten                     |Edisonstraße             |2         |75015|Bretten                |49.032767  |8.698372  |
|5     |Chemnitz                    |Zwickauer Straße         |16a       |09122|Chemnitz               |50.829383  |12.914737 |
|6     |Düsseldorf                  |Gladbecker Straße        |3         |40472|Düsseldorf             |51.274774  |6.794912  |
|7     |Essen                       |Am Thyssenhaus           |1.3       |45128|Essen                  |51.450577  |7.008871  |
|8     |Frankfurt                   |Mergenthalerallee        |73-75     |65760|Eschborn               |50.136479  |8.570963  |
|9     |Görlitz                     |Melanchthonstraße        |19        |02826|Görlitz                |51.145511  |14.970028 |
|10    |Hamburg                     |Dammtorwall              |7a        |20354|Hamburg                |53.557577  |9.986065  |
|11    |Hannover                    |Hildesheimerstraße       |265-267   |30519|Hannover               |52.337987  |9.769706  |
|12    |Ingolstadt                  |Pascalstraße             |4         |85057|Ingolstadt             |48.784417  |11.399106 |
|13    |Köln/Hürth                  |Max-Planck-Straße        |40        |50354|Hürth                  |50.886726  |6.913119  |
|14    |Lingen (Ems)                |Kaiserstraße             |10b       |49809|Lingen                 |52.519154  |7.322185  |
|15    |Münster                     |Schulstraße              |22        |48149|Münster                |51.969304  |7.61428   |
|16    |Nürnberg                    |Südwestpark              |60        |90449|Nürnberg               |49.429596  |11.017404 |
|17    |Passau                      |Dr. Hans-Kapfinger-Straße|30        |94032|Passau                 |48.571989  |13.453256 |
|18    |Schortens/Wilhelmshaven     |Beethovenstraße          |46        |26419|Schortens              |53.537779  |7.936809  |
|19    |St. Georgen                 |Leopoldstraße            |1         |78112|St. Georgen            |48.126258  |8.325873  |
|20    |Stuttgart                   |Humboldtstraße           |35        |70771|Leinfelden-Echterdingen|48.694648  |9.161239  |
|21    |Walldorf                    |Altrottstraße            |31        |69190|Walldorf               |49.295011  |8.649036  |

## Lösung der Challenge

**minimalster Weg (Luftlinie):** 2,333.41 km

**Tabelle mit Wegpunkten:**

|Nummer|Standort|Straße|Ort|
|--- |--- |--- |--- |
|1|Ismaning/München (Hauptsitz)|Robert-Bürkle-Straße 1|85737 Ismaning|
|12|Ingolstadt|Pascalstraße 4|85057 Ingolstadt|
|16|Nürnberg|Südwestpark 60|90449 Nürnberg|
|20|Stuttgart|Humboldtstraße 35|70771 Leinfelden-Echterdingen|
|19|St. Georgen|Leopoldstraße 1|78112 St. Georgen|
|4|Bretten|Edisonstraße 2|75015 Bretten|
|21|Walldorf|Altrottstraße 31|69190 Walldorf|
|8|Frankfurt|Mergenthalerallee 73-75|65760 Eschborn|
|13|Köln/Hürth|Max-Planck-Straße 40|50354 Hürth|
|6|Düsseldorf|Gladbecker Straße 3|40472 Düsseldorf|
|7|Essen|Am Thyssenhaus 1.3|45128 Essen|
|15|Münster|Schulstraße 22|48149 Münster|
|14|Lingen (Ems)|Kaiserstraße 10b|49809 Lingen|
|18|Schortens/Wilhelmshaven|Beethovenstraße 46|26419 Schortens|
|10|Hamburg|Dammtorwall 7a|20354 Hamburg|
|11|Hannover|Hildesheimerstraße 265-267|30519 Hannover|
|3|Braunschweig|Mittelweg 7|38106 Braunschweig|
|2|Berlin|Wittestraße 30|13509 Berlin|
|9|Görlitz|Melanchthonstraße 19|02826 Görlitz|
|5|Chemnitz|Zwickauer Straße 16a|09122 Chemnitz|
|17|Passau|Dr. Hans-Kapfinger-Straße 30|94032 Passau|
|1|Ismaning/München (Hauptsitz)|Robert-Bürkle-Straße 1|85737 Ismaning|


# Find your way (English)

## Table of contents

1. [Intro](#Intro)
3. [Run](#Run)
4. [Features](#Features)
5. [Example data](#Example-data)

  

## Intro
Find your way is an angular app to solve a TSP (_Traveling Salesman Problem_) using the [Branch and Bound](https://en.wikipedia.org/wiki/Branch_and_bound)-method.

## Run
1. To run the application, you need an [api key for google maps](https://developers.google.com/maps/documentation/javascript/get-api-key). Write this key in the file _/src/API_KEY.txt_ .
2. Build the docker container with `docker build -t find-your-way .`
3. Start the docker container with `docker run -it -p 80:80 find-your-way`.
4. The app should be run at [localhost:80](localhost:80).

## Features
Find-your-way has the following features:

 - CSV-Upload (see [Example data](#Example-data))
 - Visualization of the points on a map
 - Visualization of the shortest route on a map
 - Linking the route between two cities on Google Maps (e.g. from Nuremberg to Stuttgart).
 - Linking of the complete route with waypoints on Google Maps (Google Maps only supports routes with a maximum of nine waypoints, therefore the route is split automatically) 

## Example data

This is how the CSV file should look like (there is also a file _example-data.csv_ in the directory; this file is in German, but the language of the uploaded header is not important):

**note**: The columns street, house number, post code and city can be blank.

|Id|location name                |street                   |house number|post code  |city                    |latitude|longitude|
|------|----------------------------|-------------------------|----------|-----|-----------------------|-----------|----------|
|1     |Ismaning/München (Hauptsitz)|Robert-Bürkle-Straße     |1         |85737|Ismaning               |48.229035  |11.686153 |
|2     |Berlin                      |Wittestraße              |30        |13509|Berlin                 |52.580911  |13.293884 |
|3     |Braunschweig                |Mittelweg                |7         |38106|Braunschweig           |52.278748  |10.524797 |
|4     |Bretten                     |Edisonstraße             |2         |75015|Bretten                |49.032767  |8.698372  |
|5     |Chemnitz                    |Zwickauer Straße         |16a       |09122|Chemnitz               |50.829383  |12.914737 |


