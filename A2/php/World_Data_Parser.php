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

}

?>