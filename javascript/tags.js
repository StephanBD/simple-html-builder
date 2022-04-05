// {
// 	tag: "div",
// 	className: "box-2 bg-orange",
// 	children: "p"
// },
// ----------------------------
const tags = [
	{
		tag: "ul",
		textContent: "ul",
	},
	{
		tag: "li",
		textContent: "li",
	},
	{
		tag: "input",
		textContent: "input",
		attributes: {
			type: "text",
			placeholder: "placeholder",
			value: "value"
		}
	},
	{
		tag: "textarea",
		textContent: "textarea",
	},
	{
		tag: "p",
		textContent: "p",
	},
	{
		tag: "div",
		textContent: "div",
	},
	{
		tag: "span",
		textContent: "span",
	},
	{
		tag: "table",
		textContent: "table",
		children: [
			{
				tag: "caption",
				children: "caption"
			},
			// {
			// 	tag: "colgroup",
			// 	children: [
			// 		{
			// 			tag: "col",
			// 		}
			// 	]
			// },
			{

				tag: "thead",
				children: [
					{
						tag: "tr",
						children: [
							{
								tag: "th", children: "Name"
							},
							{
								tag: "th", children: "Emil"
							},
						]
					},
				]
			},
			{
				tag: "tbody",
				children: [
					{
						tag: "tr",
						children: [
							{
								tag: "td", children: "Name"
							},
							{
								tag: "td", children: "Emil"
							},
						]
					},
				]
			},
			{
				tag: "tfoot",
				children: [
					{
						tag: "tr",
						children: [
							{
								tag: "td", children: "Name"
							},
							{
								tag: "td", children: "Emil"
							},
						]
					},
				]
			},


		]
	},
	{
		tag: "button",
		textContent: "button",
		attributes: {
			className: "btn"
		}
	},
]


// ---------------------------
const algo = {
	children: [
		{
			children: [
				{
					children: [
						{
							children: "",
							tag: "DIV",
							attributes: {
								className: "dot bg-cyan-dark mx-1"
							}
						},
						{
							children: "",
							tag: "DIV",
							attributes: {
								className: "dot bg-cyan-dark mx-1"
							}
						},
						{
							children: "",
							tag: "DIV",
							attributes: {
								className: "dot bg-cyan-dark mx-1"
							}
						},
						{
							children: [
								{
									children: "",
									tag: "I",
									attributes: {
										className: "fas fa-sign-in-alt",
										style: "transform:rotateZ(270deg);"
									}
								}
							],
							tag: "DIV",
							attributes: {
								className: "btn t-black ml-a",
							}
						},
						{
							children: [
								{
									children: "",
									tag: "I",
									attributes: {
										className: "fas fa-arrow-up"
									}
								}
							],
							tag: "DIV",
							attributes: {
								className: "btn t-black",
							}
						},
						{
							children: [
								{
									children: "",
									tag: "I",
									attributes: {
										className: "fas fa-arrow-down"
									}
								}
							],
							tag: "DIV",
							attributes: {
								className: "btn t-black",
							}
						},
						{
							children: [
								{
									children: "",
									tag: "I",
									attributes: {
										className: "fab fa-html5"
									}
								}
							],
							tag: "DIV",
							attributes: {
								className: "btn bg-orange t-white",
							}
						},
						{
							children: [
								{
									children: "",
									tag: "I",
									attributes: {
										className: "fas fa-copy"
									}
								}
							],
							tag: "DIV",
							attributes: {
								className: "btn bg-green-light t-white",
							}
						},
						{
							children: [
								{
									children: "",
									tag: "I",
									attributes: {
										className: "fas fa-arrows-alt"
									}
								}
							],
							tag: "DIV",
							attributes: {
								className: "btn bg-info t-white",
							}
						},
						{
							children: [
								{
									children: "",
									tag: "I",
									attributes: {
										className: "fas fa-trash-alt"
									}
								}
							],
							tag: "DIV",
							attributes: {
								className: "btn bg-red t-white",
							}
						}
					],
					tag: "DIV",
					attributes: {
						className: "flex ai-center jc-flex-start",
					}
				}
			],
			tag: "DIV",
			attributes: {
				className: "relative"
			}
		},
		{
			children: [
				{
					children: "classes",
					tag: "BUTTON",
					attributes: {
						className: "btn-md "
					}
				},
				{
					children: "tags",
					tag: "BUTTON",
					attributes: {
						className: "btn-md  active"
					}
				},
				{
					children: "components",
					tag: "BUTTON",
					attributes: {
						className: "btn-md "
					}
				},
				{
					children: "code",
					tag: "BUTTON",
					attributes: {
						className: "btn-md  btn-generate-code"
					}
				}
			],
			tag: "DIV",
			attributes: {
				className: "flex b-bottom-1 b-cyan-light"
			}
		},
		{
			textContent: "",
			tag: "DIV",
			attributes: {
				className: "p-3 relative tabcontent",
			}
		},
		{
			textContent: "",
			tag: "DIV",
			attributes: {
				className: "p-3 tabcontent active",
			}
		},
		{
			textContent: "",
			tag: "DIV",
			attributes: {
				className: "p-3 tabcontent",
			}
		},
		{
			textContent: "",
			tag: "DIV",
			attributes: {
				className: "p-3 tabcontent",
			}
		}
	],
	tag: "DIV",
	textContent: "builder modal",
	attributes: {
		className: "bg-white shadow-md",
		autocomplete: "off"
	}
}
// ----------------------------

let components = [
	{
		tag: "div",
		textContent: '<i class="fab fa-html5"></i> card',
		attributes: {
			className: "card shadow",
		},
		children: [
			{
				tag: "img",
				attributes: {
					className: "card-img ",
				},
			},
			{
				tag: "div",
				attributes: {
					className: "card-body ",
				},
				textContent: "card",
			},
			{
				tag: "div",
				attributes: {
					className: "card-footer ",
				},
				textContent: "card",
			},
		]
	},

]

components.push(algo)
// ---------------------------
export const allTags = { components, tags }


