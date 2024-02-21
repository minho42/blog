import { parse } from "@babel/parser"
import traverse from "@babel/traverse"
import { useState, useEffect } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"

export function SymbolPanel({ sourceCode }) {
  const [nodes, setNodes] = useState([])
  const [selectedNode, setSelectedNode] = useState(null)
  const [selectedDefinition, setSelectedDefinition] = useState("")
  const [selectedReferences, setSelectedReferences] = useState([])
  const [references, setReferences] = useState([])

  const handleClickSymbol = (node) => {
    setSelectedNode(node)
  }

  const getLineContent = (lineNumber) => {
    const lines = sourceCode.split("\n")
    const index = lineNumber - 1

    if (index >= 0 && index < lines.length) {
      return lines[index]
    } else {
      return undefined
    }
  }

  const traverseSource = (sourceCode) => {
    const functionNames = []
    const functionNodes = []
    const functionReferences = []
    const ast = parse(sourceCode, {
      sourceType: "module",
    })

    traverse(ast, {
      FunctionDeclaration(path) {
        functionNames.push(path.node.id.name)
        functionNodes.push(path.node)
      },
      // ArrowFunctionExpression(path) {
      //   functionNames.push(path.container.id.name);
      //   functionNodes.push(path.node);
      // },
      Identifier(path) {
        if (path.isReferencedIdentifier()) {
          if (functionNames.includes(path.node.name)) {
            functionReferences.push({ name: path.node.name, line: path.node.loc.start.line })
          }
        }
      },
    })

    setNodes([...functionNodes])
    setReferences([...functionReferences])
  }

  useEffect(() => {
    try {
      traverseSource(sourceCode)
    } catch (error) {}

    setSelectedDefinition(getLineContent(selectedNode?.loc.start.line))

    const tempRefs = []
    references
      .filter((ref) => ref.name === selectedNode?.id?.name || ref.name === selectedNode?.container?.id?.name)
      .map((ref) => {
        tempRefs.push({ line: ref.line, content: getLineContent(ref.line) })
      })
    setSelectedReferences(tempRefs)
  }, [sourceCode, selectedNode])

  return (
    <div className="flex flex-col w-full rounded-md border border-neutral-300 text-sm ">
      <div className="px-2 py-1">
        <div className="flex w-full items-center justify-between">
          <div className="flex grow font-bold py-1 h-8">Symbols</div>
          {selectedNode ? (
            <XMarkIcon
              onClick={() => setSelectedNode(null)}
              className=" h-10 w-10 text-neutral-500 rounded-md p-2 hover:bg-neutral-100  cursor-pointer "
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col">
          {nodes.map((node) => (
            <div
              onClick={() => handleClickSymbol(node)}
              className={`
              ${
                selectedNode?.id?.name === node.id?.name ||
                selectedNode?.id?.name === node.container?.id?.name
                  ? " bg-blue-50 border-blue-300"
                  : "bg-white border-white hover:bg-blue-50"
              }
              flex rounded-md  border gap-2 p-2 cursor-pointer`}
            >
              <div
                className="flex items-center justify-center 
              bg-blue-100 text-blue-600 font-bold text-sm
              rounded-md px-1 py-0"
              >
                func
              </div>
              <div className="font-medium">{node.id?.name || node.container?.id?.name}</div>
            </div>
          ))}
        </div>
      </div>
      {selectedNode ? (
        <section>
          <div className="px-2 py-1 bg-neutral-50 border-y border-neutral-300">
            <div className="font-semibold py-1">Definition</div>
          </div>
          <div className="px-2 py-1">
            <div className="flex items-center gap-2 px-2 py-1 font-mono text-sm">
              <div className="text-neutral-500">{selectedNode?.loc.start.line}</div>
              {selectedDefinition}
            </div>
          </div>
          <div className="px-2 py-1 bg-neutral-50 border-y border-neutral-300">
            <div className="font-semibold py-1 ">{selectedReferences.length} References</div>
          </div>
          <div className="px-2 py-1 font-mono text-sm">
            {selectedReferences.map((ref) => (
              <div className="flex items-center gap-2 px-2 py-1">
                <div className="text-neutral-500">{ref.line}</div>
                <div>{ref.content}</div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  )
}
