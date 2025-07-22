import Image from "next/image";
import { BlockGridCardImage } from "@/types/strapi";
import { getStrapiMedia } from "@/lib/strapi";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function GridCardImage(props: BlockGridCardImage) {
    const { id, cards } = props;

    return (
        <section key={id} className="pt-16 pb-12 md:pt-24 md:pb-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {cards.slice(0, 6).map((card) => (
                        <div key={card.id} className="relative h-auto w-full overflow-hidden">
                            <BorderBeam
                                duration={6}
                                delay={3}
                                size={400}
                                borderWidth={2}
                                className="from-transparent via-green-600 to-transparent"
                            />
                            <article
                                data-aos="flip-left"
                                data-aos-duration="1500"
                                className="rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full"
                            >
                                {card.image && (
                                    <div className="relative aspect-[4/3] w-full">
                                        <Image
                                            src={getStrapiMedia(card.image.url)}
                                            alt="Image for card"
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    {card.badge && (
                                        <span className="text-sm font-semibold uppercase text-primary mb-2 block">
                                            {card.badge}
                                        </span>
                                    )}
                                    <h3 className="text-xl font-bold text-zinc-900 mb-2">
                                        {card.heading}
                                    </h3>
                                    <p className="text-zinc-600 text-sm">{card.text}</p>
                                </div>
                            </article>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
