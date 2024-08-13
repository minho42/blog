import projects from "./projects.json"

type Project = {
  name: string
  image: string
  url: string
  active: boolean
}

export default async function Page() {
  const activeProjects = projects.filter((b) => b.active)

  return (
      <main className="w-full sm:max-w-2xl mb-20">
        <div className="px-4 py-1">
          <h1 className="font-semibold text-3xl">Projects</h1>
          <div className="text-sm text-neutral-500">
          {activeProjects.length} iOS apps
            </div>
      </div>

      <article className="grid grid-cols-2 md:grid-cols-3 gap-3 px-2 py-2">
        {activeProjects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </article>

    </main>
  )
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <section className="flex flex-col justify-start px-4 py-2 gap-2">
      <a className="hover:underline" href={project.url} target="_blank" rel="noopener noreferrer">
        <div className="flex flex-col gap-1.5">
          <img className="size-32 border border-neutral-200 rounded-[22.5%]" src={project.image} alt={project.name} />
          <div className="text-sm text-neutral-700">
            {project.name}
          </div>
        </div>
      </a>
    </section>
  )
}