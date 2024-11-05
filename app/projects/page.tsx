import Image from "next/image"
import projects from "./projects.json"

type Project = {
  name: string
  image: string
  url: string
  active: boolean
  public: boolean
  wip: boolean
}

export default async function Page() {
  const activeProjects = projects.filter((b) => b.public)

  return (
    <main className="w-full sm:max-w-2xl mb-20">
      <div className="px-4 py-1">
        <h1 className="font-semibold text-3xl">Projects</h1>
        <div className="text-sm text-neutral-500">{activeProjects.length} projects</div>
      </div>

      <article className="grid grid-cols-2 md:grid-cols-3 gap-6 px-3 py-3">
        {activeProjects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </article>
    </main>
  )
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <section className="flex flex-col justify-center items-center">
      <a
        className="hover:underline"
        href={project.active ? project.url : "#"}
        target={project.active ? "_blank" : "_self"}
        rel="noopener noreferrer"
      >
        <div className="flex flex-col justify-center items-center gap-1.5 relative">
          <Image
            className={`size-20 border border-neutral-200 rounded-[22.5%] ${
              project.active && !project.wip ? "border-solid" : "border-2 border-dashed grayscale"
            }`}
            src={project.image || "/projectIcons/placeholder.png"}
            alt={project.name}
            width={80}
            height={80}
          />

          <div className="flex absolute -top-1 -right-1 text-4xl">
            {project.wip && <div>🔧</div>}
            {!project.active && <div>🏴‍☠️</div>}
          </div>
          {/* {!project.active && <div className="absolute -top-1 -right-1 text-4xl">🏴‍☠️</div>}
          {project.wip && <div className="absolute -top-1 -right-1 text-4xl">🚧</div>} */}
          <div className="text-sm text-neutral-700 text-center">{project.name}</div>
        </div>
      </a>
    </section>
  )
}
