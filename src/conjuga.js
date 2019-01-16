import rp from 'request-promise'
import cheerio from 'cheerio'
import {cleanStr} from './autil'
import urlencode from 'urlencode'

const parseItems = (aNode) => {
    let status = 'normal'

    let spanNode = aNode.children('span')
    if (spanNode.length == 1 && spanNode.hasClass('irreg')) {
        status = 'irregular'
    } else if (spanNode.length == 1 && spanNode.css('color') === '#00b300') {
        status = 'alteracoes'
    }

    return {
        word: cleanStr(aNode.text()),
        status
    }
}

const parseImperativo = ($, tdNode) => {
    tdNode.children().each(function () {
        if ($(this).css('color') === '#2e4fe5') {
            $(this).remove()
        }
    })

    return parseItems(tdNode)
}

const parseHtml = (html) => {
    const $ = cheerio.load(html)

    if ($('#container > table').text() === '') {
        throw 'Verbo não encontrado'
    }

    const gerundio = cleanStr($('#container > table > tbody > tr:nth-child(2) > td').text().replace('Gerúndio:', ''))
    const participioPassado = cleanStr($('#container > table > tbody > tr:nth-child(3) > td').text().replace('Particípio passado:', ''))

    const conjugaWords = {
        indicativo_presente: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(6) > td:nth-child(2)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(7) > td:nth-child(2)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(8) > td:nth-child(2)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(9) > td:nth-child(2)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(10) > td:nth-child(2)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(11) > td:nth-child(2)'))
        },
        indicativo_preterito_perfeito: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(6) > td:nth-child(4)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(7) > td:nth-child(4)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(8) > td:nth-child(4)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(9) > td:nth-child(4)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(10) > td:nth-child(4)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(11) > td:nth-child(4)'))
        },
        indicativo_preterito_imperfeito: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(6) > td:nth-child(6)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(7) > td:nth-child(6)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(8) > td:nth-child(6)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(9) > td:nth-child(6)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(10) > td:nth-child(6)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(11) > td:nth-child(6)'))
        },
        mais_que_perfeito: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(15) > td:nth-child(2)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(16) > td:nth-child(2)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(17) > td:nth-child(2)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(18) > td:nth-child(2)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(19) > td:nth-child(2)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(20) > td:nth-child(2)'))
        },
        futuro_do_presente: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(15) > td:nth-child(4)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(16) > td:nth-child(4)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(17) > td:nth-child(4)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(18) > td:nth-child(4)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(19) > td:nth-child(4)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(20) > td:nth-child(4)'))
        },

        futuro_do_preterito: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(15) > td:nth-child(6)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(16) > td:nth-child(6)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(17) > td:nth-child(6)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(18) > td:nth-child(6)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(19) > td:nth-child(6)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(20) > td:nth-child(6)'))
        },


        conjuntivo_presente: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(24) > td:nth-child(2)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(25) > td:nth-child(2)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(26) > td:nth-child(2)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(27) > td:nth-child(2)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(28) > td:nth-child(2)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(29) > td:nth-child(2)'))
        },
        conjuntivo_preterito_perfeito: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(24) > td:nth-child(4)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(25) > td:nth-child(4)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(26) > td:nth-child(4)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(27) > td:nth-child(4)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(28) > td:nth-child(4)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(29) > td:nth-child(4)'))
        },
        conjuntivo_preterito_imperfeito: {
            eu: parseItems($('#container > table > tbody > tr:nth-child(24) > td:nth-child(6)')),
            tu: parseItems($('#container > table > tbody > tr:nth-child(25) > td:nth-child(6)')),
            ele_ela: parseItems($('#container > table > tbody > tr:nth-child(26) > td:nth-child(6)')),
            nos: parseItems($('#container > table > tbody > tr:nth-child(27) > td:nth-child(6)')),
            vos: parseItems($('#container > table > tbody > tr:nth-child(28) > td:nth-child(6)')),
            eles_elas: parseItems($('#container > table > tbody > tr:nth-child(29) > td:nth-child(6)'))
        },


        imperativo_afirmativo: {
            tu: parseImperativo($, $('#container > table > tbody > tr:nth-child(34) > td:nth-child(1)')),
            ele_ela: parseImperativo($, $('#container > table > tbody > tr:nth-child(35) > td:nth-child(1)')),
            nos: parseImperativo($, $('#container > table > tbody > tr:nth-child(36) > td:nth-child(1)')),
            vos: parseImperativo($, $('#container > table > tbody > tr:nth-child(37) > td:nth-child(1)')),
            eles_elas: parseImperativo($, $('#container > table > tbody > tr:nth-child(38) > td:nth-child(1)'))
        },
        imperativo_negativo: {
            tu: parseImperativo($, $('#container > table > tbody > tr:nth-child(34) > td:nth-child(2)')),
            ele_ela: parseImperativo($, $('#container > table > tbody > tr:nth-child(35) > td:nth-child(2)')),
            nos: parseImperativo($, $('#container > table > tbody > tr:nth-child(36) > td:nth-child(2)')),
            vos: parseImperativo($, $('#container > table > tbody > tr:nth-child(37) > td:nth-child(2)')),
            eles_elas: parseImperativo($, $('#container > table > tbody > tr:nth-child(38) > td:nth-child(2)'))
        },
        imperativo_infinitivo_pessoal: {
            tu: parseImperativo($, $('#container > table > tbody > tr:nth-child(34) > td:nth-child(3)')),
            ele_ela: parseImperativo($, $('#container > table > tbody > tr:nth-child(35) > td:nth-child(3)')),
            nos: parseImperativo($, $('#container > table > tbody > tr:nth-child(36) > td:nth-child(3)')),
            vos: parseImperativo($, $('#container > table > tbody > tr:nth-child(37) > td:nth-child(3)')),
            eles_elas: parseImperativo($, $('#container > table > tbody > tr:nth-child(38) > td:nth-child(3)'))
        },


    }


    return {
        gerundio,
        participioPassado,
        conjugaWords
    }
}

export default async (verbo) => {
    const url = `http://www.conjuga-me.net/verbo-${urlencode(verbo)}`
    const html = await rp(url, {encoding: "latin1"})
    const conjugaRet = await parseHtml(html)
    conjugaRet.verbo = verbo

    return conjugaRet
}

