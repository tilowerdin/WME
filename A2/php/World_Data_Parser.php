<?php
/**
 * Created by PhpStorm.
 * User: maximilian
 * Date: 11/5/18
 * Time: 9:41 AM
 */


class WorldDataParser
{
    // Funktion um aus CSV Datei ein php-Array zu parsen
    static function parseCSV($path)
    {

        // oeffne Filehandle fuer CSV-Datei
        $handle = fopen($path, 'r');


        // Lese CSV-Datei zeilenweise ein und speichere alles in ein Array
        $returnArray = array();
        while (($line = fgetcsv($handle)) != null) {
            array_push($returnArray, $line);
        }

        return $returnArray;
    }

    // Funktion um aus von parseCSV() zurueckgegebenen Array eine XML-Datei zu erstellen und zu speichern
    static function saveXML($csvArray)
    {

        // Lese Tabellenkopf ein und speichere ihn in Array
        $tagArray = array();
        foreach ($csvArray[0] as $key => $value) {

            $tag = preg_split("/\s+/", $value)[0];

            array_push($tagArray, $tag);
        }

        // Initialisiere XML-String
        $xmlString = "<?xml version =\"1.0\" encoding=\"UTF-8\"?>\n";
        // Oeffene Roottag
        $xmlString .= "<Countries>\n";

        // Iteriere durch CSV-Array
        for ($i = 1; $i < count($csvArray); $i++) {
            // Parse jeweils ein Country zu XML-Code
            $xmlString .= "    <Country>\n";
            for ($j = 0; $j < count($tagArray); $j++) {
                // Lese ein Tag und zugehoerigen Wert und fuege in ins XML ein.
                $xmlString .= "        <" . $tagArray[$j] . ">";
                $xmlStringAfterSplit = preg_split("/\s+/", $csvArray[$i][$j], -1, PREG_SPLIT_NO_EMPTY);
                $xmlString .= implode(" ", $xmlStringAfterSplit);
                $xmlString .= "</" . $tagArray[$j] . ">\n";
            }
            $xmlString .= "    </Country>\n";
        }
        // Schliesze Roottag
        $xmlString .= "</Countries>\n";

        // Speichere XML-String in Datei "world_data.xml"
        $handle = fopen("./world_data.xml", "w");
        if ($handle && fwrite($handle, $xmlString)) {
            return true;
        } else {
            return false;
        }
    }

    // Funktion um aus XML-Datei und XLS-Template HTML zu erstellen
    static function printXML($pathXML,$pathXLST){

        // Lese XLS-Template ein
        $XSLTString = file_get_contents("../XSLSheets/stylesheet.xslt");
        $XSLDoc = new SimpleXMLElement($XSLTString);

        // Lese XML-Datei ein
        $XMLString = file_get_contents("./world_data.xml");
        $XMLDoc = new SimpleXMLElement($XMLString);

        // Verarbeite XML-Datei via XLS-Template zu HTML
        $XSLTProcessor = new XSLTProcessor();
        $XSLTProcessor->importStylesheet($XSLDoc);
        $table = $XSLTProcessor->transformToXml($XMLDoc);

        // gebe HTML im Dokument aus
        echo $table;
    }

}

?>