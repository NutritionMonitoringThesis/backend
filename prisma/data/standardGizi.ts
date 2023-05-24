import {Prisma} from '@prisma/client'

const standardGiziList : Prisma.StandarGiziCreateInput[] = [
    {
        kelompok : 'Bocil',
        awalRentang : 0,
        akhirRentang : 5,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 6,
                tinggiBadan : 60,
                Energi : 550,
                Protein : 9,
                Lemak : 31,
                Karbohidrat : 59,
                Serat : 0,
                Air : 700,
                // Vitamin
                VitA : 375,
                VitB1 : 0.2,
                VitB2 : 0.3,
                VitB3 : 2,
                VitC : 40,
                // Mineral
                Ca : 200,
                F : 100,
                Fe2 : 0.3,
                Zn2 : 1.1,
                Ka : 400,
                Cu : 200,
                Na : 120
            }
        }
    },
    {
        kelompok : 'Bocil',
        awalRentang : 6,
        akhirRentang : 11,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 9,
                tinggiBadan : 72,
                Energi : 800,
                Protein : 15,
                Lemak : 35,
                Karbohidrat : 105,
                Serat : 11,
                Air : 900,
                // Vitamin
                VitA : 400,
                VitB1 : 0.3,
                VitB2 : 0.4,
                VitB3 : 4,
                VitC : 50,
                // Mineral
                Ca : 270,
                F : 275,
                Fe2 : 11,
                Zn2 : 3,
                Ka : 700,
                Cu : 220,
                Na : 370
            }
        }
    },
    {
        kelompok : 'Bocil',
        awalRentang : 1,
        akhirRentang : 3,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 13,
                tinggiBadan : 92,
                Energi : 1350,
                Protein : 20,
                Lemak : 45,
                Karbohidrat : 215,
                Serat : 19,
                Air : 1150,
                // Vitamin
                VitA : 400,
                VitB1 : 0.5,
                VitB2 : 0.5,
                VitB3 : 6,
                VitC : 40,
                // Mineral
                Ca : 650,
                F : 460,
                Fe2 : 7,
                Zn2 : 3,
                Ka : 2600,
                Cu : 340,
                Na : 800
            }
        }
    },
{
        kelompok : 'Bocil',
        awalRentang : 4,
        akhirRentang : 6,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 19,
                tinggiBadan : 113,
                Energi : 1400,
                Protein : 25,
                Lemak : 50,
                Karbohidrat : 220,
                Serat : 20,
                Air : 1450,
                // Vitamin
                VitA : 450,
                VitB1 : 0.6,
                VitB2 : 0.6,
                VitB3 : 8,
                VitC : 45,
                // Mineral
                Ca : 1000,
                F : 500,
                Fe2 : 10,
                Zn2 : 5,
                Ka : 2700,
                Cu : 440,
                Na : 900
            }
        }
    },
{
        kelompok : 'Bocil',
        awalRentang : 7,
        akhirRentang : 9,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 27,
                tinggiBadan : 130,
                Energi : 1650,
                Protein : 40,
                Lemak : 55,
                Karbohidrat : 250,
                Serat : 23,
                Air : 1650,
                // Vitamin
                VitA : 500,
                VitB1 : 0.9,
                VitB2 : 0.9,
                VitB3 : 10,
                VitC : 45,
                // Mineral
                Ca : 1000,
                F : 500,
                Fe2 : 10,
                Zn2 : 5,
                Ka : 3200,
                Cu : 570,
                Na : 1000
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 10,
        akhirRentang : 12,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 36,
                tinggiBadan : 145,
                Energi : 2000,
                Protein : 50,
                Lemak : 65,
                Karbohidrat : 300,
                Serat : 28,
                Air : 1850,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.3,
                VitB3 : 12,
                VitC : 50,
                // Mineral
                Ca : 1200,
                F : 1250,
                Fe2 : 8,
                Zn2 : 8,
                Ka : 3900,
                Cu : 700,
                Na : 1300
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 13,
        akhirRentang : 15,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 50,
                tinggiBadan : 163,
                Energi : 2400,
                Protein : 70,
                Lemak : 80,
                Karbohidrat : 350,
                Serat : 34,
                Air : 2100,
                // Vitamin
                VitA : 600,
                VitB1 : 1.2,
                VitB2 : 1.3,
                VitB3 : 16,
                VitC : 75,
                // Mineral
                Ca : 1200,
                F : 1250,
                Fe2 : 11,
                Zn2 : 11,
                Ka : 4800,
                Cu : 795,
                Na : 1500
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 16,
        akhirRentang : 18,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 60,
                tinggiBadan : 168,
                Energi : 2650,
                Protein : 75,
                Lemak : 85,
                Karbohidrat : 400,
                Serat : 37,
                Air : 2300,
                // Vitamin
                VitA : 700,
                VitB1 : 1.2,
                VitB2 : 1.3,
                VitB3 : 16,
                VitC : 90,
                // Mineral
                Ca : 1200,
                F : 1250,
                Fe2 : 11,
                Zn2 : 11,
                Ka : 5300,
                Cu : 890,
                Na : 1700
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 19,
        akhirRentang : 29,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 60,
                tinggiBadan : 168,
                Energi : 2650,
                Protein : 65,
                Lemak : 75,
                Karbohidrat : 430,
                Serat : 37,
                Air : 2500,
                // Vitamin
                VitA : 650,
                VitB1 : 1.2,
                VitB2 : 1.3,
                VitB3 : 16,
                VitC : 90,
                // Mineral
                Ca : 1000,
                F : 700,
                Fe2 : 9,
                Zn2 : 11,
                Ka : 4700,
                Cu : 900,
                Na : 1500
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 30,
        akhirRentang : 49,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 60,
                tinggiBadan : 166,
                Energi : 2550,
                Protein : 65,
                Lemak : 70,
                Karbohidrat : 415,
                Serat : 36,
                Air : 2500,
                // Vitamin
                VitA : 650,
                VitB1 : 1.2,
                VitB2 : 1.3,
                VitB3 : 16,
                VitC : 90,
                // Mineral
                Ca : 1000,
                F : 700,
                Fe2 : 9,
                Zn2 : 11,
                Ka : 4700,
                Cu : 900,
                Na : 1500
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 50,
        akhirRentang : 64,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 60,
                tinggiBadan : 166,
                Energi : 2150,
                Protein : 65,
                Lemak : 60,
                Karbohidrat : 340,
                Serat : 30,
                Air : 2500,
                // Vitamin
                VitA : 650,
                VitB1 : 1.2,
                VitB2 : 1.3,
                VitB3 : 16,
                VitC : 90,
                // Mineral
                Ca : 1200,
                F : 700,
                Fe2 : 9,
                Zn2 : 11,
                Ka : 4700,
                Cu : 900,
                Na : 1300
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 65,
        akhirRentang : 80,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 58,
                tinggiBadan : 164,
                Energi : 1800,
                Protein : 64,
                Lemak : 50,
                Karbohidrat : 275,
                Serat : 25,
                Air : 1800,
                // Vitamin
                VitA : 650,
                VitB1 : 1.2,
                VitB2 : 1.3,
                VitB3 : 16,
                VitC : 90,
                // Mineral
                Ca : 1200,
                F : 700,
                Fe2 : 9,
                Zn2 : 11,
                Ka : 4700,
                Cu : 900,
                Na : 1100
            }
        }
    },
{
        kelompok : 'Laki-Laki',
        awalRentang : 80,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 58,
                tinggiBadan : 164,
                Energi : 1600,
                Protein : 64,
                Lemak : 45,
                Karbohidrat : 235,
                Serat : 22,
                Air : 1600,
                // Vitamin
                VitA : 650,
                VitB1 : 1.2,
                VitB2 : 1.3,
                VitB3 : 16,
                VitC : 90,
                // Mineral
                Ca : 1200,
                F : 700,
                Fe2 : 9,
                Zn2 : 11,
                Ka : 4700,
                Cu : 900,
                Na : 1000
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 10,
        akhirRentang : 12,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 38,
                tinggiBadan : 147,
                Energi : 1900,
                Protein : 55,
                Lemak : 65,
                Karbohidrat : 280,
                Serat : 27,
                Air : 1850,
                // Vitamin
                VitA : 600,
                VitB1 : 1.0,
                VitB2 : 1.0,
                VitB3 : 12,
                VitC : 50,
                // Mineral
                Ca : 1200,
                F : 1250,
                Fe2 : 8,
                Zn2 : 8,
                Ka : 4400,
                Cu : 700,
                Na : 1400
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 13,
        akhirRentang : 15,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 48,
                tinggiBadan : 156,
                Energi : 2050,
                Protein : 65,
                Lemak : 70,
                Karbohidrat : 300,
                Serat : 29,
                Air : 2100,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.0,
                VitB3 : 14,
                VitC : 65,
                // Mineral
                Ca : 1200,
                F : 1250,
                Fe2 : 15,
                Zn2 : 9,
                Ka : 4800,
                Cu : 795,
                Na : 1500
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 16,
        akhirRentang : 18,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 52,
                tinggiBadan : 159,
                Energi : 2100,
                Protein : 65,
                Lemak : 70,
                Karbohidrat : 300,
                Serat : 29,
                Air : 2150,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.0,
                VitB3 : 14,
                VitC : 75,
                // Mineral
                Ca : 1200,
                F : 1250,
                Fe2 : 15,
                Zn2 : 9,
                Ka : 5000,
                Cu : 890,
                Na : 1600
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 19,
        akhirRentang : 29,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 55,
                tinggiBadan : 159,
                Energi : 2250,
                Protein : 60,
                Lemak : 65,
                Karbohidrat : 360,
                Serat : 32,
                Air : 2350,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.1,
                VitB3 : 14,
                VitC : 75,
                // Mineral
                Ca : 1000,
                F : 700,
                Fe2 : 18,
                Zn2 : 8,
                Ka : 4700,
                Cu : 900,
                Na : 1500
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 30,
        akhirRentang : 49,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 56,
                tinggiBadan : 158,
                Energi : 2150,
                Protein : 60,
                Lemak : 60,
                Karbohidrat : 340,
                Serat : 30,
                Air : 2350,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.1,
                VitB3 : 14,
                VitC : 75,
                // Mineral
                Ca : 1000,
                F : 700,
                Fe2 : 18,
                Zn2 : 8,
                Ka : 4700,
                Cu : 900,
                Na : 1500
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 50,
        akhirRentang : 64,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 56,
                tinggiBadan : 158,
                Energi : 1800,
                Protein : 60,
                Lemak : 50,
                Karbohidrat : 280,
                Serat : 25,
                Air : 2350,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.1,
                VitB3 : 14,
                VitC : 75,
                // Mineral
                Ca : 1200,
                F : 700,
                Fe2 : 8,
                Zn2 : 8,
                Ka : 4700,
                Cu : 900,
                Na : 1400
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 65,
        akhirRentang : 80,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 53,
                tinggiBadan : 157,
                Energi : 1550,
                Protein : 58,
                Lemak : 45,
                Karbohidrat : 230,
                Serat : 22,
                Air : 1550,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.1,
                VitB3 : 14,
                VitC : 75,
                // Mineral
                Ca : 1200,
                F : 700,
                Fe2 : 8,
                Zn2 : 8,
                Ka : 4700,
                Cu : 900,
                Na : 1200
            }
        }
    },
{
        kelompok : 'Perempuan',
        awalRentang : 80,
        satuan : 'tahun',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 53,
                tinggiBadan : 157,
                Energi : 1400,
                Protein : 58,
                Lemak : 40,
                Karbohidrat : 200,
                Serat : 20,
                Air : 1400,
                // Vitamin
                VitA : 600,
                VitB1 : 1.1,
                VitB2 : 1.1,
                VitB3 : 14,
                VitC : 75,
                // Mineral
                Ca : 1200,
                F : 700,
                Fe2 : 8,
                Zn2 : 8,
                Ka : 4700,
                Cu : 900,
                Na : 1000
            }
        }
    },
{
        kelompok : 'Hamil',
        trimester : 1,
	    awalRentang : 0,
        akhirRentang : 3,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 0,
                tinggiBadan : 0,
                Energi : 180,
                Protein : 1,
                Lemak : 2.3,
                Karbohidrat : 25,
                Serat : 3,
                Air : 300,
                // Vitamin
                VitA : 300,
                VitB1 : 0.3,
                VitB2 : 0.3,
                VitB3 : 4,
                VitC : 10,
                // Mineral
                Ca : 200,
                F : 0,
                Fe2 : 0,
                Zn2 : 2,
                Ka : 0,
                Cu : 100,
                Na : 0
            }
        }
    },
{
        kelompok : 'Hamil',
        trimester : 2,
	    awalRentang : 4,
        akhirRentang : 6,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 0,
                tinggiBadan : 0,
                Energi : 300,
                Protein : 10,
                Lemak : 2.3,
                Karbohidrat : 40,
                Serat : 4,
                Air : 300,
                // Vitamin
                VitA : 300,
                VitB1 : 0.3,
                VitB2 : 0.3,
                VitB3 : 4,
                VitC : 10,
                // Mineral
                Ca : 200,
                F : 0,
                Fe2 : 9,
                Zn2 : 4,
                Ka : 0,
                Cu : 100,
                Na : 0
            }
        }
    },
{
        kelompok : 'Hamil',
        trimester : 3,
	    awalRentang : 7,
        akhirRentang : 9,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 0,
                tinggiBadan : 0,
                Energi : 300,
                Protein : 30,
                Lemak : 2.3,
                Karbohidrat : 40,
                Serat : 4,
                Air : 300,
                // Vitamin
                VitA : 300,
                VitB1 : 0.3,
                VitB2 : 0.3,
                VitB3 : 4,
                VitC : 10,
                // Mineral
                Ca : 200,
                F : 0,
                Fe2 : 9,
                Zn2 : 4,
                Ka : 0,
                Cu : 100,
                Na : 0
            }
        }
    },
{
        kelompok : 'Menyusui',
	awalRentang : 0,
        akhirRentang : 6,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 0,
                tinggiBadan : 0,
                Energi : 330,
                Protein : 20,
                Lemak : 2.2,
                Karbohidrat : 45,
                Serat : 5,
                Air : 800,
                // Vitamin
                VitA : 350,
                VitB1 : 0.4,
                VitB2 : 0.5,
                VitB3 : 3,
                VitC : 45,
                // Mineral
                Ca : 200,
                F : 0,
                Fe2 : 0,
                Zn2 : 5,
                Ka : 400,
                Cu : 400,
                Na : 0
            }
        }
    },
{
        kelompok : 'Menyusui',
	awalRentang : 7,
        akhirRentang : 12,
        satuan : 'bulan',
        standarGiziDetail : {
            create : 
            {
                // Basic 
                beratBadan : 0,
                tinggiBadan : 0,
                Energi : 400,
                Protein : 15,
                Lemak : 2.2,
                Karbohidrat : 55,
                Serat : 6,
                Air : 650,
                // Vitamin
                VitA : 350,
                VitB1 : 0.4,
                VitB2 : 0.5,
                VitB3 : 3,
                VitC : 45,
                // Mineral
                Ca : 200,
                F : 0,
                Fe2 : 0,
                Zn2 : 5,
                Ka : 400,
                Cu : 400,
                Na : 0
            }
        }
    },


]

export default standardGiziList