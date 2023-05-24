import { Prisma } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcrypt'

const adminList : Prisma.UserCreateInput[] = [
    {
        email : 'admin@stunting.co.id',
        password : hashSync('yhaAnakLuStunting', genSaltSync(10)),
        userDetails : {
            create : {
                namaLengkap : 'Apa lo gw Admin',
                jenisKelamin : 'M',
                tanggalLahir : new Date('12-12-1970'),
                tempatLahir : 'GCP Universe', 
            }
        }
    },
    {
        email : 'fahriStunting@stunting.co.id',
        password : hashSync('fahriStuntingYaGesYa', genSaltSync(10)),
        userDetails : {
            create : {
                namaLengkap : 'Muhammad Fachri Akbar',
                jenisKelamin : 'F',
                tanggalLahir : new Date('12-12-2002'),
                tempatLahir : 'Bekasi Beda Planet', 
            }
        }
    }
]

export default adminList