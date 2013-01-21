/**
 * Haller.js v2.2
 * sercaneraslan.com
 *
 * Kullanımı örnekleri:
 * console.log(Hal("sercan","de")); > sercan'da
 * console.log(Hal("Murat","iyelik")); > Murat'ın
 * console.log(Hal("osman","i")); > osman'ı
 * console.log(Hal("alp","de")); > alp'te
 * console.log(Hal("Cemal","e")); > Cemal'e
 */
var Hal = function(isim, hal) {
    var caseMap = {
            "I":"ı",
            "İ":"i",
            "Ş":"ş",
            "Ğ":"ğ"
        },
        isimKucukHarf = (isim.replace(/[IİŞĞ]/g, function(s) {
                return caseMap[s];
            })).toLowerCase(),
        iyelik = 'iyelik',
        iHali = 'i',
        eHali = 'e',
        deHali = 'de',
        denHali = 'den',
        iEkleri = 'ııiiuuüü', // iyelik ve i hali ekleri
        sonHarf = isimKucukHarf.slice(-1),

        // Sapkali harf istisnasi mevcut mu? Orn: Alp, Resul, Cemal...
        istisna = ~~/[ei][^ıüoö]*[au]l$|alp$/.test(isimKucukHarf) * 2, // 0 veya 2 degeri cikar
        // seslilerden sonuncusunu al
        sonSesli = isimKucukHarf.match(/[aıeiouöü]/g).pop(),

        // Ekin sesli harfine karar verelim
        ek = (hal == iyelik || hal == iHali) ? // iyelik veya i hali istenmisse
                iEkleri[ 'aıeiouöü'.indexOf(sonSesli) + istisna ]
            : // e, de veya den hali istenmisse
                /[aıou]/.test(sonSesli) && (istisna ? 'e' : 'a') || // Son sesli harf a, ı, o veya u ise
                'e';  // Son sesli harf e, i, ö veya ü ise


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
        ek = (/[fstkçşhp]/.test( sonHarf ) ? 't' : 'd') + ek;
    }

    // Son ekleri belirleyelim
    if (hal == iyelik || hal == denHali) { // iyelik veya den hali ise
        ek += 'n'
    }

    // Isimle birlestirip donelim
    return isim + "'" + ek;
};