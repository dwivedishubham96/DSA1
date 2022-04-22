
function KMPSearch(pat,txt)
{   var z=[]
    var M = pat.length;
    var N = txt.length;
  
    // create lps[] that will hold the longest prefix suffix
    // values for pattern
    var lps=[M];
  
    // Preprocess the pattern (calculate lps[] array)
    computeLPSArray(pat, M, lps);
  
    var i = 0; // index for txt[]
    var j = 0; // index for pat[]
    while (i < N) {
        if (pat[j] == txt[i]) {
            j++;
            i++;
        }
  
        if (j == M) {
            z.push(i-j)
            //console.log("Found pattern at index %d "+(i - j));
            j = lps[j - 1];
        }
  
        // mismatch after j matches
        else if (i < N && pat[j] != txt[i]) {
            // Do not match lps[0..lps[j-1]] characters,
            // they will match anyway
            if (j != 0)
                j = lps[j - 1];
            else
                i = i + 1;
        }
    }
    return z;
}
function computeLPSArray(pat,M,lps)
{
    // length of the previous longest prefix suffix
    var len = 0;
  
    lps[0] = 0; // lps[0] is always 0
  
    // the loop calculates lps[i] for i = 1 to M-1
    var i = 1;
    while (i < M) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        }
        else // (pat[i] != pat[len])
        {
            // This is tricky. Consider the example.
            // AAACAAAA and i = 7. The idea is similar
            // to search step.
            if (len != 0) {
                len = lps[len - 1];
  
                // Also, note that we do not increment
                // i here
            }
            else // if (len == 0)
            {
                lps[i] = 0;
                i++;
            }
        }
    }
}
function shubham()
{
    var txt = document.getElementById('#text').value;
    var pat = document.getElementById('#pat').value;
    var z = KMPSearch(pat, txt);
    var g="";
    for(var p=0;p<z.length;p++){
        g+=z[p]+" "
    }
    if(z.length>0)
    document.getElementById('#print').innerHTML="Found pattern at index "+g
    else if(z.length===0)
    document.getElementById('#print').innerHTML="Not Found"
    return 0;
}