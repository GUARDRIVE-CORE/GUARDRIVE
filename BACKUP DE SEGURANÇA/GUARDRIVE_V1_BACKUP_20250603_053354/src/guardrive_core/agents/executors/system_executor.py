ata.Xml.Dom.IXmlNode)">
      <summary>Quita el nodo secundario especificado de la lista de elementos secundarios y lo devuelve.</summary>
      <param name="childNode">El nodo secundario que se va a quitar de la lista de elementos secundarios de este nodo.</param>
      <returns>Nodo secundario eliminado. Si es NULL, el objeto *childNode* no se quita.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlDocumentType.ReplaceChild(Windows.Data.Xml.Dom.IXmlNode,Windows.Data.Xml.Dom.IXmlNode)">
      <summary>Reemplaza el antiguo nodo secundario especificado con el nuevo nodo secundario proporcionado.</summary>
      <param name="newChild">El nuevo elemento secundario que va a reemplazar al antiguo. Si es NULL, el parámetro *referenceChild* se quita sin un reemplazo.</param>
      <param name="referenceChild">El anterior elemento secundario que se va a reemplazar por el nuevo.</param>
      <returns>El anterior elemento secundario que se va a reemplazar. Si es NULL, no se crea ningún objeto.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlDocumentType.SelectNodes(System.String)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve la lista de nodos coincidentes como un objeto XmlNodeList.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <returns>La colección de nodos seleccionados aplicando la operación de coincidencia de modelos indicada. Si no hay ningún nodo seleccionado, este método devuelve una colección vacía.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlDocumentType.SelectNodesNS(System.String,System.Object)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve la lista de nodos coincidentes como un objeto XmlNodeList.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <param name="namespaces">Contiene una cadena que especifica los espacios de nombres que se van a usar en expresiones Xpath cuando sea necesario definir nuevos espacios de nombres externamente. Los espacios de nombres se definen en el estilo XML como una lista separada por espacios de atributos de declaración de espacio de nombres. Puede utilizar esta propiedad para establecer también el espacio de nombres predeterminado.</param>
      <returns>La colección de nodos seleccionados aplicando la operación de coincidencia de modelos indicada. Si no hay ningún nodo seleccionado, devuelve una colección vacía.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlDocumentType.SelectSingleNode(System.String)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve el primer nodo coincidente.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <returns>El primer nodo que coincide con la operación de coincidencia de modelos especificada. Si ningún nodo coincide con la expresión, el método devuelve un valor NULL.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlDocumentType.SelectSingleNodeNS(System.String,System.Object)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve el primer nodo coincidente.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <param name="namespaces">Contiene una cadena que especifica los espacios de nombres que se van a usar en expresiones Xpath cuando sea necesario definir nuevos espacios de nombres externamente. Los espacios de nombres se definen en el estilo XML como una lista separada por espacios de atributos de declaración de espacio de nombres. Puede utilizar esta propiedad para establecer también el espacio de nombres predeterminado.</param>
      <returns>El primer nodo que coincide con la operación de coincidencia de modelos especificada. Si ningún nodo coincide con la expresión, este método devuelve un valor NULL.</returns>
    </member>
    <member name="T:Windows.Data.Xml.Dom.XmlDomImplementation">
      <summary>Proporciona métodos que son independientes de cualquier instancia determinada del modelo de objetos de documento.</summary>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlDomImplementation.HasFeature(System.String,System.Object)">
      <summary>Indica la compatibilidad para la característica especificada.</summary>
      <param name="feature">Especifica la característica que se va a probar. En el nivel 1, los valores de características válidos son "XML", "DOM" y "MS-DOM" (sin distinción entre mayúsculas y minúsculas).</param>
      <param name="version">Especifica el número de versión que se debe probar. Si es NULL, comprueba la implementación de la característica en cualquier versión. En el nivel 1, "1.0" es el valor válido de la versión.</param>
      <returns>True si se implementa la característica especificada; de lo contrario, false.</returns>
    </member>
    <member name="T:Windows.Data.Xml.Dom.XmlElement">
      <summary>Encapsula información específica de los nodos de elemento XML.</summary>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.Attributes">
      <summary>Obtiene la lista de atributos de este nodo.</summary>
      <returns>Los atributos para este nodo.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.ChildNodes">
      <summary>Obtiene una lista de elementos secundarios en el nodo actual.</summary>
      <returns>Lista de nodos secundarios.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.FirstChild">
      <summary>Obtiene el primer nodo secundario.</summary>
      <returns>El primer nodo secundario. Esta propiedad devuelve NULL si no hay elementos secundarios.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.InnerText">
      <summary>Obtiene el texto desde dentro del XML.</summary>
      <returns>El texto desde dentro del XML. Devuelve una cadena vacía si no hay ningún texto.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.LastChild">
      <summary>Obtiene el último nodo secundario.</summary>
      <returns>Último nodo secundario. Esta propiedad es NULL si no hay elementos secundarios.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.LocalName">
      <summary>Obtiene el nombre local, que es la parte local de un nombre completo. Esto se denomina la parte local en los espacios de nombres de XML.</summary>
      <returns>El nombre local.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.NamespaceUri">
      <summary>Devuelve el identificador uniforme de recursos (URI) para el espacio de nombres.</summary>
      <returns>URI del espacio de nombres. Esto hace referencia a la parte "uuu" de la declaración de espacio de nombres xmlns:nnn="uuu".</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.NextSibling">
      <summary>Obtiene el siguiente elemento relacionado del nodo en la lista de elementos secundarios del elemento primario.</summary>
      <returns>El elemento relacionado derecho de este nodo.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.NodeName">
      <summary>Devuelve el nombre completo para el atributo, el tipo de documento, el elemento, la entidad o los nodos de notación. Devuelve una cadena fija para el resto de tipos de nodo.</summary>
      <returns>El nombre de nodo completo, que varía dependiendo del tipo de nodo.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.NodeType">
      <summary>Obtiene el tipo de nodo del Modelo de objetos de documento XML (DOM), que determina los valores válidos y si el nodo puede tener nodos secundarios.</summary>
      <returns>Tipo de nodo.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.NodeValue">
      <summary>Obtiene o establece el texto asociado al nodo.</summary>
      <returns>Texto asociado al nodo.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.OwnerDocument">
      <summary>Devuelve la raíz del documento que contiene el nodo.</summary>
      <returns>El documento principal que representa la raíz del documento.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.ParentNode">
      <summary>Obtiene el nodo primario de la instancia del nodo.</summary>
      <returns>Nodo primario.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.Prefix">
      <summary>Obtiene o establece el prefijo de espacio de nombres.</summary>
      <returns>El prefijo de espacio de nombres especificado en el elemento, el atributo o la referencia de entidad. Por ejemplo, para el elemento &lt;xxx:yyy&gt;, esta propiedad devuelve xxx. Devuelve una cadena vacía, "", si no se especifica ningún prefijo.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.PreviousSibling">
      <summary>Obtiene el elemento relacionado anterior del nodo en la lista de elementos secundarios del elemento primario.</summary>
      <returns>El elemento relacionado izquierdo de este nodo.</returns>
    </member>
    <member name="P:Windows.Data.Xml.Dom.XmlElement.TagName">
      <summary>Obtiene el nombre del elemento.</summary>
      <returns>La etiqueta de este elemento.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.AppendChild(Windows.Data.Xml.Dom.IXmlNode)">
      <summary>Agrega un nuevo nodo secundario como el último elemento secundario del nodo.</summary>
      <param name="newChild">El nuevo nodo secundario que se anexará al final de la lista de elementos secundarios de este nodo.</param>
      <returns>El nuevo nodo secundario se anexó correctamente a la lista. Si es NULL, no se crea ningún objeto.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.CloneNode(System.Boolean)">
      <summary>Clona un nuevo nodo.</summary>
      <param name="deep">Marca que indica si se deben clonar recursivamente todos los nodos que son descendientes de este nodo. Si es true, este método crea un clon del árbol completo debajo de este nodo. Si es false, este método solo clona este nodo y sus atributos.</param>
      <returns>El nodo clonado que se acaba de crear.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.GetAttribute(System.String)">
      <summary>Devuelve el valor del atributo.</summary>
      <param name="attributeName">Nombre del atributo requerido.</param>
      <returns>Valor de cadena del atributo.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.GetAttributeNode(System.String)">
      <summary>Devuelve el nodo de atributo.</summary>
      <param name="attributeName">Nombre del atributo requerido.</param>
      <returns>El puntero de atributo devuelto.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.GetAttributeNodeNS(System.Object,System.String)">
      <summary>Devuelve el atributo especificado del espacio de nombres especificado.</summary>
      <param name="namespaceUri">Espacio de nombres del atributo que se va a obtener.</param>
      <param name="localName">Nombre del atributo sin el prefijo de espacio de nombres.</param>
      <returns>El puntero de atributo devuelto.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.GetAttributeNS(System.Object,System.String)">
      <summary>Devuelve el valor del atributo.</summary>
      <param name="namespaceUri">Espacio de nombres del atributo que se va a obtener.</param>
      <param name="localName">Nombre del atributo sin el prefijo de espacio de nombres.</param>
      <returns>Valor de cadena del atributo.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.GetElementsByTagName(System.String)">
      <summary>Devuelve una lista de todos los elementos descendientes que coinciden con el nombre proporcionado.</summary>
      <param name="tagName">Etiqueta de los elementos necesarios.</param>
      <returns>Elementos necesarios. La lista puede estar vacía.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.GetXml">
      <summary>Devuelve la representación XML del nodo y de todos sus descendientes.</summary>
      <returns>La representación XML del nodo y de todos sus descendientes.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.HasChildNodes">
      <summary>Determina si un nodo tiene elementos secundarios.</summary>
      <returns>True si este nodo tiene elementos secundarios; de lo contrario, false.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.InsertBefore(Windows.Data.Xml.Dom.IXmlNode,Windows.Data.Xml.Dom.IXmlNode)">
      <summary>Inserta un nodo secundario a la izquierda del nodo especificado, o al final de la lista.</summary>
      <param name="newChild">La dirección del nuevo nodo que se va a insertar. El nodo pasado aquí debe ser un elemento secundario válido del nodo de documento DOM XML actual. Por ejemplo, si el nodo actual es un atributo, no puede pasar otro atributo en el parámetro *newChild*, porque un atributo no puede tener un atributo como elemento secundario. Si la clase *newChild* es un tipo de nodo DOCUMENT_FRAGMENT, todos sus elementos secundarios se insertan en orden antes de *referenceChild*.</param>
      <param name="referenceChild">Nodo de referencia. El nodo especificado donde se insertará el nodo *newChild* a la izquierda, como el elemento relacionado anterior en la lista secundaria. El nodo pasado aquí debe ser un nodo secundario del nodo actual o NULL. Si el valor es NULL, el nodo *newChild* se inserta al final de la lista secundaria. Si el nodo *referenceChild* no es un elemento secundario del nodo actual, se devuelve un error.</param>
      <returns>Si se realiza correctamente, el nodo secundario que se insertó. Si es NULL, no se crea ningún objeto.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.Normalize">
      <summary>Normaliza todos los elementos descendientes combinando dos o más nodos de texto adyacentes en un nodo de texto unificado.</summary>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.RemoveAttribute(System.String)">
      <summary>Quita o reemplaza el atributo con nombre.</summary>
      <param name="attributeName">Nombre del atributo que se va a quitar.</param>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.RemoveAttributeNode(Windows.Data.Xml.Dom.XmlAttribute)">
      <summary>Quita el atributo especificado de este elemento.</summary>
      <param name="attributeNode">El atributo que se va a quitar.</param>
      <returns>El atributo quitado, si lo hubiera.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.RemoveAttributeNS(System.Object,System.String)">
      <summary>Quita el atributo especificado de este elemento del espacio de nombres especificado.</summary>
      <param name="namespaceUri">Espacio de nombres del atributo que se va a quitar.</param>
      <param name="localName">Nombre del atributo sin el prefijo de espacio de nombres.</param>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.RemoveChild(Windows.Data.Xml.Dom.IXmlNode)">
      <summary>Quita el nodo secundario especificado de la lista de elementos secundarios y lo devuelve.</summary>
      <param name="childNode">El nodo secundario que se va a quitar de la lista de elementos secundarios de este nodo.</param>
      <returns>Nodo secundario eliminado. Si es NULL, el objeto *childNode* no se quita.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.ReplaceChild(Windows.Data.Xml.Dom.IXmlNode,Windows.Data.Xml.Dom.IXmlNode)">
      <summary>Reemplaza el antiguo nodo secundario especificado con el nuevo nodo secundario proporcionado.</summary>
      <param name="newChild">El nuevo elemento secundario que va a reemplazar al antiguo. Si es NULL, el parámetro *referenceChild* se quita sin un reemplazo.</param>
      <param name="referenceChild">El anterior elemento secundario que se va a reemplazar por el nuevo.</param>
      <returns>El anterior elemento secundario que se va a reemplazar. Si es NULL, no se crea ningún objeto.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.SelectNodes(System.String)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve la lista de nodos coincidentes como un objeto XmlNodeList.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <returns>La colección de nodos seleccionados aplicando la operación de coincidencia de modelos indicada. Si no hay ningún nodo seleccionado, este método devuelve una colección vacía.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.SelectNodesNS(System.String,System.Object)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve la lista de nodos coincidentes como un objeto XmlNodeList.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <param name="namespaces">Contiene una cadena que especifica los espacios de nombres que se van a usar en expresiones Xpath cuando sea necesario definir nuevos espacios de nombres externamente. Los espacios de nombres se definen en el estilo XML como una lista separada por espacios de atributos de declaración de espacio de nombres. Puede utilizar esta propiedad para establecer también el espacio de nombres predeterminado.</param>
      <returns>La colección de nodos seleccionados aplicando la operación de coincidencia de modelos indicada. Si no hay ningún nodo seleccionado, devuelve una colección vacía.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.SelectSingleNode(System.String)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve el primer nodo coincidente.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <returns>El primer nodo que coincide con la operación de coincidencia de modelos especificada. Si ningún nodo coincide con la expresión, el método devuelve un valor NULL.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.SelectSingleNodeNS(System.String,System.Object)">
      <summary>Aplica la operación de coincidencia de modelos especificada al contexto de este nodo y devuelve el primer nodo coincidente.</summary>
      <param name="xpath">Especifica una expresión XPath.</param>
      <param name="namespaces">Contiene una cadena que especifica los espacios de nombres que se van a usar en expresiones Xpath cuando sea necesario definir nuevos espacios de nombres externamente. Los espacios de nombres se definen en el estilo XML como una lista separada por espacios de atributos de declaración de espacio de nombres. Puede utilizar esta propiedad para establecer también el espacio de nombres predeterminado.</param>
      <returns>El primer nodo que coincide con la operación de coincidencia de modelos especificada. Si ningún nodo coincide con la expresión, este método devuelve un valor NULL.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.SetAttribute(System.String,System.String)">
      <summary>Establece el valor del atributo denominado.</summary>
      <param name="attributeName">Nombre del atributo requerido.</param>
      <param name="attributeValue">Nuevo valor del atributo.</param>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.SetAttributeNode(Windows.Data.Xml.Dom.XmlAttribute)">
      <summary>Obtiene o actualiza el nodo de atributo proporcionado en este elemento.</summary>
      <param name="newAttribute">Un puntero al nuevo atributo.</param>
      <returns>El puntero al atributo anterior (si existe) con el mismo nombre que se devuelve.</returns>
    </member>
    <member name="M:Windows.Data.Xml.Dom.XmlElement.SetAttributeNodeNS(Windows.Data.Xml.Dom.XmlAttribute)">
      <summary>Obtiene o actualiza el nodo de atributo proporcionado en este elemento. Si no está utilizando ningún espacio de nombres, utilice el método SetAttributeNode.</summary>
      <param name="newAttribute">Nodo que se va a agregar a la colección.</param>
      <returns>El atribu