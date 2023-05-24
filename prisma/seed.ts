import { PrismaClient } from '@prisma/client'
import adminList from './data/user'
import standardGiziList from './data/standardGizi'
import { giziMakananList } from './data/giziMakanan'
import { StandardStuntingList } from './data/standardStunting'
import { educationArticleList } from './data/educationArticle'

const prisma = new PrismaClient()


async function main () {
    for (const data of adminList) {
        await prisma.user.create({
                data : data,
                include: {
                userDetails: true
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    console.log ('Admin sudah dibuat jumlah :' + adminList.length)

    for (const data of standardGiziList) {
        await prisma.standarGizi.create({
            data : data
        })
        .catch(err => {
            console.log(err)
        })
    }
    console.log('Standard Gizi Sudah Diseed sebanyak ' + standardGiziList.length)
    
    for (const data of giziMakananList) {
        await prisma.giziMakanan.create({
            data : data
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    console.log(`Standard Stunting List berhasil diinput sebanyak ${StandardStuntingList.length}`)
    for (const data of StandardStuntingList ) {
        await prisma.standardStunting.create({
            data : data
        })
        .catch(err => {
            console.log(err)
        })
    }

    console.log(`Artikel telah di input sebanyak ${educationArticleList.length} buah artikel penuh Hoax!`)
    for (const data of educationArticleList) {
        await prisma.educationArticle.create({
            data : data
        })
        .catch(err => {
            console.log(err)
        })
    }
}

main ()
    .catch (e => {
        console.error(e)
        process.exit()
    })
    .finally(async () => {
        await prisma.$disconnect()
    })