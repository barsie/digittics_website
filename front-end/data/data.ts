import img from '../public/whatsapp_b.png'

export const NAV_LINKS = [
    {url: "/", key: "home", label: "Home"},
    {url: "/planes", key: "planes", label: "Planes y Precios"},
    {url: "/solutions", key: "solutions", label: "Soluciones"},
]


export const PRICING_PLANS = [
    { name: 'Básico', 
      currency: 'CFAS', 
      price: 7000, 
      calendar: 'Al Mes, Por Aire Acondicionado', 
      description: 'Plan Incluye:',
      promo: 'Ahorra un 5% más con un pago trimestral',
      // for: 'Recomendado para ', 
      button: 'Comprar Plan', 
      img: img,

        features: [
            {item: "Alta de Servicio Gratis"},
            {item: "Lavado cada 60 días"},
            {item: "Incorporación de gas"},
            {item: "25% Off en Reparaciones"},
            {item: "10% descuento a partir de 3 aires acondicionados suscritos"},
        ]
    },
    
    { name: 'Hogar', 
      currency: 'CFAS', 
      price: 10000, 
      calendar: 'Al Mes, Por Aire Acondicionado', 
      description: 'Plan Incluye:', 
      button: 'Comprar Plan',
      promo: 'Ahorra un 8% más con un pago trimestral',
      // for: 'Recomendado para ',
      img: img, 
        features: [
            {item: "Alta de Servicio Gratis"},
            {item: "Lavado cada 45 días"},
            {item: "Incorporación de gas"},
            {item: "50% Off en Reparaciones"},
            {item: "50% de Recambios incluídos"},
            {item: "10% descuento a partir de 2 aires acondicionados suscritos"},
        ]
    },
    
    { name: 'BUSINESS', 
      currency: 'CFAS', 
      price: 15000, 
      calendar: 'Al Mes, Por Aire Acondicionado', 
      description: 'Plan Incluye:', 
      button: 'Contactar Ventas',
      promo: 'Ahorra un 10% más con un pago trimestral',
      // for: 'Recomendado para ',
      img: img, 
        features: [
            {item: "Alta de Servicio Gratis"},
            {item: "Lavado cada 30 días"},
            {item: "Incorporación de gas"},
            {item: "70% Off en Reparaciones"},
            {item: "Instalaciones incluidas"},
            {item: "70% de Recambios cubiertos"},
            {item: "10% descuento a partir de 5 aires acondicionados suscritos"},
        ]
    },
    
    { name: 'PREMIUM', 
      currency: 'CFAS', 
      price: 20000, 
      calendar: 'Al Mes, Por Aire Acondicionado', 
      description: 'Plan Incluye:', 
      button: 'Contactar Ventas',
      promo: 'Ahorra un 10% más con un pago trimestral',
      // for: 'Recomendado para ', 
      img: img, 
        features: [
            {item: "Alta de Servicio Gratis"},
            {item: "Lavado cada 30 días"},
            {item: "Incorporación de gas"},
            {item: "100% de Reparaciones"},
            {item: "Instalaciones incluidas"},
            {item: "100% de Recambios cubiertos"},
            {item: "10% descuento a partir de 10 aires acondicionados suscritos"},
        ]
    },
    
]
