export function formatBlogCode(code) {
    code = code.replace(/<h1>/g, '<h1 className="text-xl leading-6 font-medium text-gray-800">')
    code = code.replace(/<h2>/g, '<h2 className="text-xl leading-6 font-medium text-gray-800">')
    code = code.replace(/<h3>/g, '<h3 className="text-lg leading-6 font-medium text-gray-800">')
    code = code.replace(/<h4>/g, '<h4 className="text-lg leading-6 font-medium text-gray-800">')
    code = code.replace(/<h5>/g, '<h5 className="text-md leading-6 font-medium text-gray-800">')
    code = code.replace(/<h6>/g, '<h6 className="text-md leading-6 font-medium text-gray-800">')
    return code
}