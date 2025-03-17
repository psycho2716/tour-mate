import { howItWorksSteps } from "@/data/howItWorks"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 w-full bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How TourMate Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Start exploring in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary text-white mb-6">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

