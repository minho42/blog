import s4 from "./s4.json"
import s8 from "./s8.json"

type S4 = {
  name: string
}
type S8 = {
  name: string
  brandNames: string[]
}

function DrugList({
  drugs,
  title,
  description,
  source,
}: {
  drugs: S4[] | S8[]
  title: string
  description: string
  source: string
}) {
  return (
    <section className="px-3">
      <h2 className="text-center space-x-1 py-3 text-2xl border-b border-dashed border-neutral-400">
        <span className="font-semibold">
          {title} ({description})
        </span>
        <span>
          [
          <a href={source} target="_blank">
            source
          </a>
          ]
        </span>
      </h2>

      <article className="leading-8">
        {drugs.map((drug) => {
          const typedDrug = drug as S4 | S8
          return (
            <div key={typedDrug.name}>
              <span>{typedDrug.name}</span>

              {"brandNames" in typedDrug && typedDrug.brandNames.length > 0 && (
                <span className="ml-1.5 text-base text-neutral-500">
                  (
                  {typedDrug.brandNames.map((brandName, index) => (
                    <span key={brandName}>{(index ? ", " : "") + brandName}</span>
                  ))}
                  )
                </span>
              )}
            </div>
          )
        })}
      </article>
    </section>
  )
}

export function Drugs() {
  return (
    <div className="flex flex-col items-center justify-items-center">
      <div>Data collected: 2023-12-29</div>

      <div className="flex flex-col gap-6">
        <DrugList
          drugs={s4}
          title="S4"
          description="prescribed restricted substances"
          source="https://www.health.nsw.gov.au/pharmaceutical/Pages/sch4d.aspx"
        />

        <DrugList
          drugs={s8}
          title="S8"
          description="drugs of addiction"
          source="https://www.health.nsw.gov.au/pharmaceutical/Pages/drugs-of-addiction-sch8.aspx"
        />
      </div>
    </div>
  )
}
