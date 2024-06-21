let queueData = [];

function addToQueue(value) {
    if (queueData.length < 6) {
        queueData.push(value);
        visualizeQueue(queueData);
    } else {
        alert("A fila está cheia!");
    }
}

function removeFromQueue() {
    if (queueData.length > 0) {
        queueData.shift();
        visualizeQueue(queueData);
    } else {
        alert("A fila está vazia!");
    }
}

function simulateQueue() {
    queueData = [1, 2, 3, 4, 5, 6];
    visualizeQueue(queueData);
}

function visualizeQueue(data) {
    const svg = d3.select("#visualization").html("").append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 70 + 10)
        .attr("y", 200)
        .attr("width", 60)
        .attr("height", 40)
        .attr("fill", "steelblue");

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * 70 + 40)
        .attr("y", 225)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d);
}

// Chamadas de exemplo
simulateQueue();
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    addToEnd(value) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        visualizeLinkedList(this.head);
    }

    removeFromStart() {
        if (!this.head) {
            alert("A lista ligada está vazia!");
            return;
        }
        this.head = this.head.next;
        visualizeLinkedList(this.head);
    }
}

let linkedList = new LinkedList();

function simulateLinkedList() {
    linkedList = new LinkedList();
    linkedList.addToEnd(1);
    linkedList.addToEnd(2);
    linkedList.addToEnd(3);
    linkedList.addToEnd(4);
    linkedList.addToEnd(5);
    linkedList.addToEnd(6);
    linkedList.addToEnd(7);
}

function visualizeLinkedList(head) {
    const data = [];
    let current = head;
    while (current) {
        data.push(current.value);
        current = current.next;
    }

    const svg = d3.select("#visualization").html("").append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    const lineGenerator = d3.line()
        .x((d, i) => i * 70 + 30)
        .y(250)
        .curve(d3.curveBasis);

    const points = data.map((d, i) => [i * 70 + 30, 250]);

    svg.append("path")
        .attr("d", lineGenerator(points))
        .attr("fill", "none")
        .attr("stroke", "black");

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => i * 70 + 30)
        .attr("cy", 250)
        .attr("r", 20)
        .attr("fill", "steelblue");

    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d, i) => i * 70 + 30)
        .attr("y", 255)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d);
}

// Chamadas de exemplo
simulateLinkedList();
let nodes = [
    { id: 1 }, { id: 2 }, { id: 3 },
    { id: 4 }, { id: 5 }, { id: 6 },
    { id: 7 }
];

let links = [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 2, target: 4 },
    { source: 2, target: 5 },
    { source: 3, target: 6 },
    { source: 3, target: 7 }
];

function addNode() {
    const newNodeId = nodes.length + 1;
    nodes.push({ id: newNodeId });
    visualizeGraph(nodes, links);
}

function addEdge() {
    let nodeId1 = prompt("Digite o ID do primeiro nó:");
    let nodeId2 = prompt("Digite o ID do segundo nó:");

    // Validar se os IDs digitados são válidos (existem no array de nodes)
    if (!nodeId1 || !nodeId2) {
        alert("IDs de nó inválidos!");
        return;
    }

    nodeId1 = parseInt(nodeId1);
    nodeId2 = parseInt(nodeId2);

    const node1 = nodes.find(node => node.id === nodeId1);
    const node2 = nodes.find(node => node.id === nodeId2);

    if (!node1 || !node2) {
        alert("Os IDs dos nós não foram encontrados!");
        return;
    }

    // Verificar se já existe uma aresta entre esses dois nós
    if (links.some(link => (link.source.id === nodeId1 && link.target.id === nodeId2) || (link.source.id === nodeId2 && link.target.id === nodeId1))) {
        alert("Já existe uma aresta entre esses nós!");
        return;
    }

    // Adicionar a nova aresta
    links.push({ source: node1, target: node2 });
    visualizeGraph(nodes, links);
}


function removeEdge() {
    let nodeId1 = prompt("Digite o ID do primeiro nó da aresta a ser removida:");
    let nodeId2 = prompt("Digite o ID do segundo nó da aresta a ser removida:");

    // Validar se os IDs digitados são válidos (existem no array de nodes)
    if (!nodeId1 || !nodeId2) {
        alert("IDs de nó inválidos!");
        return;
    }

    nodeId1 = parseInt(nodeId1);
    nodeId2 = parseInt(nodeId2);

    const node1 = nodes.find(node => node.id === nodeId1);
    const node2 = nodes.find(node => node.id === nodeId2);

    if (!node1 || !node2) {
        alert("Os IDs dos nós não foram encontrados!");
        return;
    }

    // Verificar se a aresta existe para remoção
    const index = links.findIndex(link =>
        (link.source.id === nodeId1 && link.target.id === nodeId2) ||
        (link.source.id === nodeId2 && link.target.id === nodeId1)
    );

    if (index === -1) {
        alert("A aresta selecionada não foi encontrada!");
        return;
    }

    // Remover a aresta
    links.splice(index, 1);
    visualizeGraph(nodes, links);
}


function simulateGraph() {
    visualizeGraph(nodes, links);
}

function visualizeGraph(nodes, links) {
    const svgWidth = window.innerWidth * 0.8;
    const svgHeight = 500;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3.select("#visualization").html("").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(20))
        .on("tick", ticked);

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "black");

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 20)
        .attr("fill", "steelblue")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const text = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("fill", "white")
        .text(d => d.id);

    function ticked() {
        link
            .attr("x1", d => Math.max(0, Math.min(width, d.source.x)))
            .attr("y1", d => Math.max(0, Math.min(height, d.source.y)))
            .attr("x2", d => Math.max(0, Math.min(width, d.target.x)))
            .attr("y2", d => Math.max(0, Math.min(height, d.target.y)));

        node
            .attr("cx", d => d.x = Math.max(20, Math.min(width - 20, d.x)))
            .attr("cy", d => d.y = Math.max(20, Math.min(height - 20, d.y)));

        text
            .attr("x", d => Math.max(0, Math.min(width, d.x)))
            .attr("y", d => Math.max(0, Math.min(height, d.y)));
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

// Chamadas de exemplo
simulateGraph();
