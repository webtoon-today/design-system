
/**
 * 
 * @param {string} rawString
 * @returns {JSX.Element[]} 
 */
export const parseMD = (rawString) => {
  return rawString.split('\n').map((line) =>{
    const parsedHead = parseMDHead(line);
    const parsedLink = parseMDLink(line);

    return parsedHead || parsedLink || line;
  })
}

/**
 * 
 * @param {string} line 
 * @returns {JSX.Element | null}
 */
export const parseMDHead = (line) => {
  if (line.startsWith('### ')){
    return <h3>{line.replace(/#/gm,'').trim()}</h3>
  }
  if (line.startsWith('## ')){
    return <h2>{line.replace(/#/gm,'').trim()}</h2>
  }
  if (line.startsWith('# ')){
    return <h1>{line.replace(/#/gm,'').trim()}</h1>
  }

  return null
}

/**
 * 
 * @param {string} line 
 * @returns {JSX.Element | null}
 */
export const parseMDLink = (line) => {
  if (!line.startsWith('[')){
    return null
  }

  if (!line.includes('](')){
    return null
  }

  const [text, link] = line.split('](');
  
  return <a href={link.replace(/\[\)/gm,'')}>{text.replace(/\[/gm,'')}</a>
}