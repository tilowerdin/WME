<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <link rel="stylesheet" type="text/css" href="../css/table.css"/>
                <link rel="stylesheet" type="text/css" href="../css/header.css"/>
            </head>
            <body>
                <h1>World Data Overview</h1>
                <table>
                    <thead>
                    <tr>
                        <th style="text-align:left">ID</th>
                        <th style="text-align:left">Country</th>
                        <th style="text-align:left">Birth rate / 100</th>
                        <th style="text-align:left">Cellphone / 100</th>
                        <th style="text-align:left">Children / Women</th>
                        <th style="text-align:left">Electric Usage</th>
                        <th style="text-align:left">Internet Usage</th>
                    </tr>
                    </thead>
                    <tbody>
                    <xsl:for-each select="Countries/Country">
                        <tr>
                            <td><xsl:value-of select="id"/></td>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="birth"/></td>
                            <td><xsl:value-of select="cell"/></td>
                            <td><xsl:value-of select="children"/></td>
                            <td><xsl:value-of select="electricity"/></td>
                            <td><xsl:value-of select="internet"/></td>
                        </tr>
                    </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>

