
import { Check } from "lucide-react";

const features = [
  {
    title: "Expense Tracking",
    description: "Categorize and visualize your spending patterns with automated insights.",
    included: true
  },
  {
    title: "Investment Performance",
    description: "Monitor your portfolio growth against market benchmarks and personal goals.",
    included: true
  },
  {
    title: "Retirement Calculator",
    description: "Project your financial independence date based on current savings and spending.",
    included: true
  },
  {
    title: "Tax Optimization",
    description: "Advanced tax planning strategies to reduce your annual tax burden.",
    included: false,
    premium: true
  },
  {
    title: "Premium Research",
    description: "Access to exclusive investment research and market analysis.",
    included: false,
    premium: true
  },
  {
    title: "1-on-1 Advisor",
    description: "Personal consultation with a certified financial advisor.",
    included: false,
    premium: true
  },
];

const FeatureCard = ({ feature }) => {
  return (
    <div className={`p-4 md:p-6 rounded-lg border ${
      feature.premium 
        ? "border-goldLight/30 bg-gradient-to-br from-charcoal to-softdark" 
        : "border-platinum/10 bg-softdark"
    }`}>
      <div className="flex items-start gap-3 md:gap-4">
        <div className={`mt-1 rounded-full p-1 flex-shrink-0 ${
          feature.premium ? "bg-gold-gradient" : "bg-emerald"
        }`}>
          <Check className="h-3 w-3 md:h-4 md:w-4 text-charcoal" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg md:text-xl font-bold mb-2 ${
            feature.premium ? "gold-text-gradient" : ""
          }`}>
            {feature.title}
          </h3>
          <p className="text-platinum/70 text-sm md:text-base leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-charcoal">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-16 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Premium Features</h2>
          <p className="text-platinum/70 text-base md:text-lg leading-relaxed">
            Our dashboard offers powerful tools to help you track, manage, and grow your wealth strategically for the ultimate path to financial independence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 flex flex-col items-center">
          <div className="dashboard-card w-full max-w-md border-goldLight/30 animate-gold-glow">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 gold-text-gradient text-center">Hypercard Membership</h3>
            <p className="text-platinum/70 mb-4 md:mb-6 text-center text-sm md:text-base leading-relaxed">
              Unlock all premium features and personalized financial guidance with our elite tier.
            </p>
            <div className="mb-4 md:mb-6 text-center">
              <span className="text-3xl md:text-4xl font-bold">$99</span>
              <span className="text-platinum/70 ml-2 text-base md:text-lg">/month</span>
            </div>
            <button className="gold-button w-full text-base md:text-lg py-3">Upgrade Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
