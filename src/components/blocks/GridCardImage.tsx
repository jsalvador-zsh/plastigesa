import Image from "next/image"
import { BlockGridCardImage } from "@/types/strapi"
import { getStrapiMedia } from "@/lib/strapi"
import { BorderBeam } from "@/components/magicui/border-beam"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function GridCardImage(props: BlockGridCardImage) {
  const { id, cards } = props

  return (
    <section key={id} className="p-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
          {cards.slice(0, 6).map((card) => (
            <Card
              key={card.id}
              data-aos="flip-left"
              data-aos-duration="1500"
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow h-full"
            >
              <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-green-600 to-transparent"
              />
              <BorderBeam
                duration={6}
                delay={3}
                size={400}
                borderWidth={2}
                className="from-transparent via-primary to-transparent"
              />
              {card.image && (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={getStrapiMedia(card.image.url)}
                    alt={card.heading ?? "Imagen"}
                    fill
                    className="object-cover -z-10"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <CardHeader className="flex flex-col">
                {card.badge && (
                  <span className="text-xs text-background bg-green-600 py-1 px-3 rounded-lg font-semibold uppercase tracking-wide">
                    {card.badge}
                  </span>
                )}
                <CardTitle className="text-xl text-zinc-900">
                  {card.heading}
                </CardTitle>
                <CardDescription className="text-zinc-600 text-pretty">
                  {card.text}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
