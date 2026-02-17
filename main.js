(function(tests){

  var DATA_URL = "https://prog2700.onrender.com/dna/";
  var DNA_SEQUENCE = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";
  // Step 1: Convert DNA sequence into codons (3 letters each)
    var extractCodonsFromDNA = function(dnaSequence)
    {
        var codons = [];

        // remove any hidden spaces or new lines
        dnaSequence = dnaSequence.replace(/\s/g, "");

        for (var i = 0; i + 3 <= dnaSequence.length; i += 3)
        {
            codons.push(dnaSequence.substring(i, i + 3));
        }

        return codons;
    }

    // Step 2: Convert codons into amino abbreviations using JSON data
    var translateCodonsToAminos = function(codons, jsonData)
    {
        var aminos = [];

        var lookup = {};
        for (var i = 0; i < jsonData.length; i++)
        {
            var item = jsonData[i];
            for (var j = 0; j < item.codons.length; j++)
            {
                lookup[item.codons[j]] = item.abbr;
            }
        }

        for (var k = 0; k < codons.length; k++)
        {
            aminos.push(lookup[codons[k]]);
        }

        return aminos;
    }

    var runProgram = function ()
    {
        var codons = extractCodonsFromDNA(DNA_SEQUENCE); // DO NOT MODIFY
        var aminos; // DO NOT MODIFY

        fetch(DATA_URL)
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                aminos = translateCodonsToAminos(codons, json);
                tests.runTests(codons, aminos); // DO NOT MODIFY
            })
            .catch(function(error){
                console.log("API error:", error);
            });
    }

    runProgram(); // DO NOT MODIFY

})(tests);