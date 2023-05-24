import { Prisma } from "@prisma/client"

export const giziMakananList : Prisma.GiziMakananCreateInput[] = [
    {
        namaMakanan : 'Ayam Taliwang',
        beratPerPorsi : 150,
        Air : 57.5,
        Energi: 264,
        Protein : 18.2,
        Lemak : 20.1,
        Karbohidrat : 2.7,
        Serat : 0,
        Ca : 94,
        F : 164,
        Fe2 : 2,
        Na : 507,
        Ka : 408.0,
        Cu : 0.40,
        Zn2 : 12.3,
        // Retinol -> Vit A
        VitA : 1067,
        // Thiamin -> B1
        VitB1 : 0,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
    {
        namaMakanan : 'Beef Burger',
        beratPerPorsi : 175,
        Air : 45.5,
        Energi: 258,
        Protein : 10.6,
        Lemak : 9.5,
        Karbohidrat : 32.5,
        Serat : 0.4,
        Ca : 210,
        F : 157,
        Fe2 : 2.6,
        Na : 572,
        Ka : 189.1,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 218,
        // Thiamin -> B1
        VitB1 : 0.95,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Beef Teriyaki',
        beratPerPorsi : 125,
        Air : 65.1,
        Energi: 151,
        Protein : 8.6,
        Lemak : 3.1,
        Karbohidrat : 22.3,
        Serat : 0.3,
        Ca : 142,
        F : 62,
        Fe2 : 2.3,
        Na : 377,
        Ka : 189.1,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 22,
        // Thiamin -> B1
        VitB1 : 0.53,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Chicken Teriyaki',
        beratPerPorsi : 125,
        Air : 68.2,
        Energi: 168,
        Protein : 13.0,
        Lemak : 9.6,
        Karbohidrat : 7.5,
        Serat : 0.8,
        Ca : 137,
        F : 106,
        Fe2 : 3.1,
        Na : 959,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 68,
        // Thiamin -> B1
        VitB1 : 0.65,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Gado-Gado',
        beratPerPorsi : 100,
        Air : 68.5,
        Energi: 137,
        Protein : 6.1,
        Lemak : 3.2,
        Karbohidrat : 21.0,
        Serat : 1.1,
        Ca : 301,
        F : 135,
        Fe2 : 7.5,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 3,
        // Thiamin -> B1
        VitB1 : 0.10,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 1
    },
{
        namaMakanan : 'Kalio Ayam',
        beratPerPorsi : 150,
        Air : 64.7,
        Energi: 203,
        Protein : 16.0,
        Lemak : 13.5,
        Karbohidrat : 4.4,
        Serat : 0,
        Ca : 278,
        F : 177,
        Fe2 : 4.2,
        Na : 534,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 105,
        // Thiamin -> B1
        VitB1 : 0.35,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
    {
        namaMakanan : 'Karedok',
        beratPerPorsi : 120,
        Air : 79.0,
        Energi: 92,
        Protein : 2.2,
        Lemak : 3.3,
        Karbohidrat : 14.1,
        Serat : 1.4,
        Ca : 174,
        F : 85,
        Fe2 : 2.4,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 0,
        // Thiamin -> B1
        VitB1 : 0.08,
        // Riboflamin -> B2
        VitB2 : 3,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Ketoprak',
        beratPerPorsi : 150,
        Air : 69.1,
        Energi: 153,
        Protein : 7.9,
        Lemak : 7.7,
        Karbohidrat : 13.0,
        Serat : 2.9,
        Ca : 153,
        F : 134,
        Fe2 : 3.4,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 3,
        // Thiamin -> B1
        VitB1 : 0.05,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Martabak Mesir',
        beratPerPorsi : 250,
        Air : 40.2,
        Energi: 278,
        Protein : 5.1,
        Lemak : 8.6,
        Karbohidrat : 45.0,
        Serat : 0,
        Ca : 49,
        F : 168,
        Fe2 : 3.4,
        Na : 193,
        Ka : 123,
        Cu : 0.20,
        Zn2 : 0.9,
        // Retinol -> Vit A
        VitA : 0,
        // Thiamin -> B1
        VitB1 : 0,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Mie Aceh Rebus',
        beratPerPorsi : 200,
        Air : 74.6,
        Energi: 113,
        Protein : 3.0,
        Lemak : 3.2,
        Karbohidrat : 18.1,
        Serat : 0,
        Ca : 22,
        F : 44,
        Fe2 : 1.4,
        Na : 191,
        Ka : 36,
        Cu : 0.20,
        Zn2 : 0.3,
        // Retinol -> Vit A
        VitA : 0,
        // Thiamin -> B1
        VitB1 : 0,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Mie Ayam',
        beratPerPorsi : 200,
        Air : 78.6,
        Energi: 102,
        Protein : 6.2,
        Lemak : 3.9,
        Karbohidrat : 10.5,
        Serat : 0,
        Ca : 262,
        F : 51,
        Fe2 : 1.8,
        Na : 279,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 39,
        // Thiamin -> B1
        VitB1 : 0.85,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Mie Bakso',
        beratPerPorsi : 200,
        Air : 74.5,
        Energi: 114,
        Protein : 5.3,
        Lemak : 3.0,
        Karbohidrat : 16.4,
        Serat : 0.1,
        Ca : 286,
        F : 53,
        Fe2 : 1.9,
        Na : 760,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 17,
        // Thiamin -> B1
        VitB1 : 0.16,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Mie Pangsit Basah',
        beratPerPorsi : 200,
        Air : 79.2,
        Energi: 105,
        Protein : 5.9,
        Lemak : 4.9,
        Karbohidrat : 9.4,
        Serat : 0,
        Ca : 208,
        F : 48,
        Fe2 : 2.0,
        Na : 530,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 25,
        // Thiamin -> B1
        VitB1 : 0.46,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Nasi Rames',
        beratPerPorsi : 250,
        Air : 65.8,
        Energi: 155,
        Protein : 10.3,
        Lemak : 4.2,
        Karbohidrat : 19.1,
        Serat : 0,
        Ca : 239,
        F : 62,
        Fe2 : 1.8,
        Na : 265,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 96,
        // Thiamin -> B1
        VitB1 : 0.59,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Pempek Telur',
        beratPerPorsi : 150,
        Air : 62.4,
        Energi: 156,
        Protein : 4.7,
        Lemak : 2.7,
        Karbohidrat : 28.3,
        Serat : 0,
        Ca : 13,
        F : 83,
        Fe2 : 1.3,
        Na : 448,
        Ka : 48,
        Cu : 0.10,
        Zn2 : 0.6,
        // Retinol -> Vit A
        VitA : 0,
        // Thiamin -> B1
        VitB1 : 0.20,
        // Riboflamin -> B2
        VitB2 : 0.05,
        // Niasin -> B3
        VitB3 : 1.1,
        VitC : 0
    },
{
        namaMakanan : 'Rendang Sapi',
        beratPerPorsi : 150,
        Air : 57.9,
        Energi: 193,
        Protein : 22.6,
        Lemak : 7.9,
        Karbohidrat : 7.8,
        Serat : 0,
        Ca : 474,
        F : 211,
        Fe2 : 14.9,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 21,
        // Thiamin -> B1
        VitB1 : 0.12,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Sop Daging Sapi',
        beratPerPorsi : 125,
        Air : 87.5,
        Energi: 49,
        Protein : 5.8,
        Lemak : 0.5,
        Karbohidrat : 5.3,
        Serat : 0,
        Ca : 158,
        F : 48,
        Fe2 : 2.2,
        Na : 391,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 101,
        // Thiamin -> B1
        VitB1 : 0.37,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Soto Betawi',
        beratPerPorsi : 175,
        Air : 75.9,
        Energi: 135,
        Protein : 2.5,
        Lemak : 8.8,
        Karbohidrat : 11.5,
        Serat : 0.5,
        Ca : 222,
        F : 72,
        Fe2 : 1.9,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 6,
        // Thiamin -> B1
        VitB1 : 0.04,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
{
        namaMakanan : 'Soto Padang',
        beratPerPorsi : 175,
        Air : 75,
        Energi: 127,
        Protein : 5.9,
        Lemak : 6.6,
        Karbohidrat : 11,
        Serat : 0.7,
        Ca : 298,
        F : 94,
        Fe2 : 1.5,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 12,
        // Thiamin -> B1
        VitB1 : 0.22,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
    {
        namaMakanan : 'Bebek Goreng',
        beratPerPorsi : 150,
        Air : 48.8,
        Energi: 300,
        Protein : 24.0,
        Lemak : 20.7,
        Karbohidrat : 4.51,
        Serat : 0.0,
        Ca : 170,
        F : 170,
        Fe2 : 4.1,
        Na : 34,
        Ka : 6.0,
        Cu : 0.40,
        Zn2 : 3.0,
        // Retinol -> Vit A
        VitA : 0,
        // Thiamin -> B1
        VitB1 : 0.10,
        // Riboflamin -> B2
        VitB2 : 0.40,
        // Niasin -> B3
        VitB3 : 10.6,
        VitC : 0
    },
    {
        namaMakanan : 'Cumi Cumi Goreng',
        beratPerPorsi : 125,
        Air : 54.2,
        Energi: 265,
        Protein : 40.6,
        Lemak : 10.1,
        Karbohidrat : 0,
        Serat : 0,
        Ca : 62,
        F : 270,
        Fe2 : 2.7,
        Na : 86,
        Ka : 81.9,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 0,
        // Thiamin -> B1
        VitB1 : 0.09,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 6.3,
        VitC : 0
    },
    {
        namaMakanan : 'Gulai Kambing',
        beratPerPorsi : 150,
        Air : 78.4,
        Energi: 126,
        Protein : 4.2,
        Lemak : 9.4,
        Karbohidrat : 6.2,
        Serat : 0,
        Ca : 45,
        F : 73,
        Fe2 : 1.3,
        Na : 302,
        Ka : 138.0,
        Cu : 0.20,
        Zn2 : 1.1,
        // Retinol -> Vit A
        VitA : 151,
        // Thiamin -> B1
        VitB1 : 0.13,
        // Riboflamin -> B2
        VitB2 : 0.01,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
    {
        namaMakanan : 'Sayur Asem',
        beratPerPorsi : 100,
        Air : 93.2,
        Energi: 29,
        Protein : 0.7,
        Lemak : 0.6,
        Karbohidrat : 5.0,
        Serat : 0.6,
        Ca : 40,
        F : 61,
        Fe2 : 3.1,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 14,
        // Thiamin -> B1
        VitB1 : 0.10,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
    {
        namaMakanan : 'Semur Jengkol',
        beratPerPorsi : 100,
        Air : 52.7,
        Energi: 212,
        Protein : 6.0,
        Lemak : 10.0,
        Karbohidrat : 29.1,
        Serat : 0,
        Ca : 77,
        F : 99,
        Fe2 : 1.0,
        Na : 0,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 0,
        // Thiamin -> B1
        VitB1 : 0.14,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 4
    },
    {
        namaMakanan : 'Sop Buntut',
        beratPerPorsi : 175,
        Air : 86.1,
        Energi: 71,
        Protein : 7.5,
        Lemak : 3.6,
        Karbohidrat : 2.2,
        Serat : 0,
        Ca : 286,
        F : 38,
        Fe2 : 3.2,
        Na : 490,
        Ka : 0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 119,
        // Thiamin -> B1
        VitB1 : 0.14,
        // Riboflamin -> B2
        VitB2 : 0,
        // Niasin -> B3
        VitB3 : 0,
        VitC : 0
    },
    {
        namaMakanan : 'Tekwan',
        beratPerPorsi : 175,
        Air : 86.7,
        Energi: 53,
        Protein : 1.9,
        Lemak : 0.9,
        Karbohidrat : 9.4,
        Serat : 0,
        Ca : 9,
        F : 41,
        Fe2 : 1.0,
        Na : 174,
        Ka : 42.0,
        Cu : 0,
        Zn2 : 0,
        // Retinol -> Vit A
        VitA : 99,
        // Thiamin -> B1
        VitB1 : 0.10,
        // Riboflamin -> B2
        VitB2 : 0.02,
        // Niasin -> B3
        VitB3 : 0.4,
        VitC : 0
    },
] 