<?php
/**
 * Created by PhpStorm.
 * User: maximilian
 * Date: 11/5/18
 * Time: 9:41 AM
 */


class WorldDataParser
{
    static function parseCSV($path)
    {

        $handle = fopen($path, 'r');
        $returnArray = array();

        while (($line = fgetcsv($handle)) != null) {
            array_push($returnArray, $line);
        }

        return $returnArray;
    }

    static function saveXML($csvArray)
    {

        $tagArray = array();
        foreach ($csvArray[0] as $key => $value) {

            $tag = preg_split("/\s+/", $value)[0];

            array_push($tagArray, $tag);
        }


        $xmlString = "<?xml version =\"1.0\" encoding=\"UTF-8\"?>\n";
        $xmlString .= "<Countries>\n";

        for ($i = 1; $i < count($csvArray); $i++) {
            $xmlString .= "    <Country>\n";
            for ($j = 0; $j < count($tagArray); $j++) {
                $xmlString .= "        <" . $tagArray[$j] . ">";
                $xmlStringAfterSplit = preg_split("/\s+/", $csvArray[$i][$j], -1, PREG_SPLIT_NO_EMPTY);
                $xmlString .= implode(" ", $xmlStringAfterSplit);
                $xmlString .= "</" . $tagArray[$j] . ">\n";
            }
            $xmlString .= "    </Country>\n";
        }

        $xmlString .= "</Countries>\n";

        $handle = fopen("./world_data.xml", "w");
        if ($handle && fwrite($handle, $xmlString)) {
            return true;
        } else {
            return false;
        }
    }

    static function printXML($pathXML,$pathXLST){

        $XSLTString = file_get_contents("../XSLSheets/stylesheet.xslt");
        $XSLDoc = new SimpleXMLElement($XSLTString);

        $XMLString = file_get_contents("./world_data.xml");
        $XMLDoc = new SimpleXMLElement($XMLString);


        $XSLTProcessor = new XSLTProcessor();
        $XSLTProcessor->importStylesheet($XSLDoc);
        $table = $XSLTProcessor->transformToXml($XMLDoc);

        echo $table;
    }

}

?>