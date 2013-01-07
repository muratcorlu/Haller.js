/*
*
* Haller.js v2.0
* sercaneraslan.com
*
* Kullanımı örnekleri:
* console.log(Hal("sercan","de")); > sercan'da
* console.log(Hal("Murat","iyelik")); > Murat'ın
* console.log(Hal("osman","i")); > osman'ı
* console.log(Hal("Alp","de")); > Alp'te
* console.log(Hal("Cemal","e")); > Cemal'e
*/
var Hal = function(isim, hal, undefined) {
    var sesliHarfler = 'aıeiouöü',
        sertUnsuzler = 'fstkçşhp',
        iyelik = 'iyelik',
        iHali = 'i',
        eHali = 'e',
        deHali = 'de',
        denHali = 'den',

        sonHarf,
        i,
        istisna,
        sesliler=[],
        ek,
        code,
        sonSesli,
        sonSesliIndex,
        oncekiSesli;

    // Ismin her bir harfi icin...
    for (i in isim) {
        // Eger bu harf sesli ise,
        // sesliler listesine harf sira numarasini ekle,
        // bu harfin isimdeki siranumarasini sonSesliIndex degiskenine ata
        (code = sesliHarfler.indexOf(isim[i])) > -1 && (sesliler.push(code) & (sonSesliIndex = ~~i));
        // bu harfi sonHarf degiskenine al
        sonHarf = isim[i];
    }

    // seslilerden sonuncusunu al
    sonSesli = sesliler.pop();

    // Sapkali harf istisnasi mevcut mu? Orn: Alp, Resul, Cemal...
    if ( sonSesli == 0 || sonSesli == 5) { // Son sesli harf a veya u ise
        // son sesliden sonraki harf l ise
        if (isim[sonSesliIndex + 1] == 'l') {
            // onceki sesli e veya i ise ya da isim tek hece ise
            oncekiSesli = sesliler.pop();
            if ( oncekiSesli == undefined || oncekiSesli == 2 || oncekiSesli == 3) {
                istisna = 1;
            }
        }
    }

    // Ekin sesli harfine karar verelim
    if (hal == iyelik || hal == iHali) {
        ek = (sonSesli == 0 || sonSesli == 1) && istisna ? 'i' : 'ı' || // Son sesli harf a veya ı ise
             (sonSesli == 2 || sonSesli == 3) && 'i' || // Son sesli harf e veya i ise
             (sonSesli == 4 || sonSesli == 5) && istisna ? 'ü' : 'u' || // Son sesli harf o veya u ise
             'ü';   // Son sesli harf ö veya ü ise
    } else {
        ek = (sonSesli == 0 || sonSesli == 1 ||
                sonSesli == 4 || sonSesli == 5) && istisna ? 'e' : 'a' || // Son sesli harf a, ı, o veya u ise
            'e';  // Son sesli harf e, i, ö veya ü ise
    }

    // Ön ekleri belirleyelim (kaynaştırma harfi)
    if ( sonHarf == sonSesli ) { // Sesli ile mi bitiyor
        if (hal == iyelik) { // iyelik hali ise
            ek = 'n' + ek
        }
        if (hal == iHali || hal == eHali) { // i veya e hali ise
            ek = 'y' + ek
        }
    }
    if (hal == deHali  || hal == denHali) { // de veya den hali ise
        ek = (sertUnsuzler.indexOf( sonHarf ) > -1 ? 't' : 'd') + ek;
    }

    // Son ekleri belirleyelim
    if (hal == iyelik || hal == denHali) { // iyelik veya den hali ise
        ek += 'n'
    }

    // Isimle birlestirip donelim
    return isim + "'" + ek;
}