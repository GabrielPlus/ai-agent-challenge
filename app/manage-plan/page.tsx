import SchematicComponent from "@/components/schematic/SchematicComponent"

function page() {
  return (
    <div className="container mx-auto p-4 md:p-0">
        <h1 className="text-2xl font-bold mb-4 my-8">Manage Your Plan</h1>
        <p className="text-gray-600 mb-8">
            Manage Your subscription and billing details here.
        </p>
        <SchematicComponent componentId="cmpn_LLyni8H6J7Q" />
    </div>
  )
}

export default page
