import { MobileLayout } from "@/components/layout/MobileLayout";
import { ShoppingBag, Sparkles, Zap, Palette } from "lucide-react";
import { Flame } from "lucide-react";


const categories = [
  { id: "boosts", name: "Boosts", icon: Zap, count: 12 },
  { id: "cosmetics", name: "Cosmétiques", icon: Palette, count: 24 },
  { id: "special", name: "Spéciaux", icon: Sparkles, count: 8 },
];

const featuredItems = [
  { id: 1, name: "Bonnet Alien", price: 500, img: "/images/boutique_1.png", type: "cosmetic" },
  { id: 2, name: "Chapeau blanc", price: 200, img: "/images/boutique_2.png", type: "boost" },
  { id: 3, name: "Haut monstre", price: 750, img: "/images/boutique_3.png", type: "cosmetic" },
  { id: 4, name: "Pantalon bleu", price: 1000, img: "/images/boutique_4.png", type: "special" },
];

export default function Shop() {
  return (
    <MobileLayout>
      <div className="p-4 animate-fade-in">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl">BOUTIQUE</h1>
          <div className="flex items-center gap-2 bg-[#C4D600] rounded-full px-4 py-2">
            <span className="font-display">2,450</span>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/408/408472.png"
                alt="diamond"
                className="w-4 h-4"
              />
            </span>
          </div>
        </header>

        {/* Categories */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="terrun-card flex flex-col items-center py-4 hover:border-primary transition-colors"
            >
              <cat.icon className="w-6 h-6 mb-2" />
              <span className="text-sm font-medium">{cat.name}</span>
              <span className="text-xs text-muted-foreground">{cat.count} items</span>
            </button>
          ))}
        </div>

        {/* Featured */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title">EN VEDETTE</h2>
            <button className="text-sm text-gray-500 font-medium hover:underline">Voir tout</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {featuredItems.map((item) => (
              <div key={item.id} className="terrun-card">
                <div className="w-full aspect-square bg-muted rounded-xl flex items-center justify-center text-4xl mb-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="object-contain"
                  />
                </div>

                <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-display flex items-center gap-1">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/408/408472.png"
                      alt="diamond"
                      className="w-4 h-4"
                    />
                    {item.price}
                  </span>
                  <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-background" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coming soon banner */}
        <div className="mt-6 bg-gradient-to-r from-[#58c0fa] to-[#fff] rounded-2xl p-4 text-center">
          <p className="font-display text-lg">
            <span className="align-middle inline-block mr-2">
              <Flame className="w-5 h-5 text-black" />
            </span>
            NOUVEAUTÉS BIENTÔT
          </p>
          <p className="text-sm mt-1">Plus de cosmétiques et boosts arrivent !</p>
        </div>
      </div>
    </MobileLayout>
  );
}
