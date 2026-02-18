(function(tests){

  var DATA_URL = "https://prog2700.onrender.com/dna/";
  var DNA_SEQUENCE = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";
 
     // Extract Codons as JavaScript Array from the DNA Sequence String.
    var extractCodonsFromDNA = function(dnaSequence)
    {
        var codons = [];

        // TODO: ADD CODE TO COMPLETE THE FUNCTION HERE...
        // you'll get an error notification in the console until the function is completed correctly

        // remove any hidden spaces or new lines
        dnaSequence = dnaSequence.replace(/\s/g, "");

        // loop through the DNA string, 3 characters at a time
        for (var i = 0; i + 3 <= dnaSequence.length; i += 3) {
            codons.push(dnaSequence.substring(i, i + 3));
        }

        return codons;
    }

    // Compare the Codons array with the map of Amino Acids found in the json data.
    // Add any matches to the aminos array.
    var translateCodonsToAminos = function(codons, jsonData)
    {
        var aminos = [];

        // TODO: ADD CODE TO COMPLETE THE FUNCTION HERE...
        // you'll get an error notification in the console until the function is completed correctly

        // create lookup table: codon -> amino abbreviation
        var lookup = {};

        for (var i = 0; i < jsonData.length; i++) {
            var item = jsonData[i];

            for (var j = 0; j < item.codons.length; j++) {
                lookup[item.codons[j]] = item.abbr;
            }
        }

        // translate codons using lookup table
        for (var k = 0; k < codons.length; k++) {
            aminos.push(lookup[codons[k]]);
        }

        return aminos;
    }

    var runProgram = function () {

        var codons = extractCodonsFromDNA(DNA_SEQUENCE); //DO NOT MODIFY
        var aminos; //DO NOT MODIFY

        // TODO: ENTER CODE TO LOAD DATA FROM API HERE.

        fetch(DATA_URL)
            .then(function(response){
                return response.json();
            })
            .then(function(json){
                //ONCE YOU HAVE YOUR API CALL WORKING, UNCOMMENT THE LINE ABOVE THE runTests LINE AND APPLY
                //BOTH LINES (including the test line) WITHIN THE CODE ABOVE WHERE YOU RECEIVE YOUR JSON DATA FROM YOUR API CALL...
                //DO NOT MODIFY THE LINES EXCEPT FOR UNCOMMENTING THEM AND MOVING THEM TO THE CORRECT LOCATION ABOVE IN CODE

                aminos = translateCodonsToAminos(codons, json); //DO NOT MODIFY...but you can uncomment and move when ready
                tests.runTests(codons, aminos); //DO NOT MODIFY...but you can move when ready
            })
            .catch(function(error){
                console.log("API error:", error);
            });
    }

    runProgram(); // DO NOT MODIFY

})(tests);