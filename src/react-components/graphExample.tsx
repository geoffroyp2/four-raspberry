import React from "react";
import { Line } from "react-chartjs-2";

const GraphExample = () => {
  const data = {
    labels: ["1", "2", "3", "4", "5", "6"], // titre pour le hover sur les points: nécessaire pour avoir tous les points ??
    datasets: [
      {
        label: "# of Votes", // texte pour le hover et la légende
        data: [12, 19, 3, 5, 2, 3], // valeur y

        fill: false, // remplit l'aire sous la courbe

        backgroundColor: "rgb(0, 0, 0)", // couleur de remplissage de la courbe
        borderColor: "rgba(255, 99, 132, 0.3)", // couleur de la courbe
        borderWidth: 4, // épaisseur de la courbe

        pointBackgroundColor: "rgba(0, 0, 150, 0.6)", // portion centrale des points
        pointBorderColor: "rgba(0, 0, 150, 0.3)", // bordure des points
        pointBorderWidth: 4, // épaisseur de la bordure
        pointHitRadius: 5, // rayon de hover
        pointHoverBackgroundColor: "rgba(0, 0, 150, 0.9)", // transformations de hover
        pointHoverBorderColor: "rgba(0, 0, 150, 0.6)",
        pointHoverBorderWidth: 8,
        pointStyle: "circle", // forme du point (cross, star, crossRot...)

        lineTension: 0.3, // arrondi de l'interpolation, 0 = lignes droites
        steppedLine: false, // ligne en palliers : before / after / middle

        yAxisID: "y-axis-1", // cf. id dans options
        order: 0, // ordre de traçage + légende
      },
      {
        label: "# of No Votes",
        data: [1, 2, 1, 1, 2, 2],
        fill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgba(54, 162, 235, 0.2)",
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    responsiveAnimationDuration: 0, // resize animation

    animation: {
      // cf. https://www.chartjs.org/docs/latest/configuration/animations.html
      // animation de tout le graph : ligne et points
      duration: 0, // en millisecondes
    },

    hover: {
      mode: "point", // point = hover un point à la fois. nearest = tous les points qui correspondent au x de la souris,
      intersect: true, // hover seulement quand la souris s'approche d'un point
      axis: "x",
      animationDuration: 100, //ms
    },

    layout: {
      padding: { left: 0 }, // left, right, top, bottom
    },

    title: {
      display: true,
      position: "top",
      text: "Graph", // + all font options
    },

    legend: {
      display: true,
      position: "bottom",
      fullWidth: true,
      align: "center", //start / end
      // onClick, onHover, onLeave ==> callbacks pour chaque item de legend
      labels: {
        boxWidth: 40, // largeur de la boite
        fontSize: 12, // +all font options
        padding: 10, // écart entre les items
        usePointStyle: false, // true = style des points, false = style de la courbe
      },
    },

    tooltips: {
      // cf. https://www.chartjs.org/docs/latest/configuration/tooltip.html
      enabled: false,
    },

    elements: {
      // gestion globale de style pour les datasets (à styliser comme un dataset)
    },

    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1", // pour link avec le dataset
          offset: true, // true = petit espace au-dessus/dessous des valeurs max

          ticks: {
            display: true,

            fontColor: "#222", // => autre syntaxe de couleur
            // fontFamily: "Helvetica",
            fontSize: 12,
            fontStyle: "bold",
            padding: 0, // padding entre l'axe et le texte

            // callback: (val, idx, values) => {
            //    callback pour formattage particulier des ticks
            // },

            // major: {
            //   // only in log and time scale
            //   enabled: true,
            //   fontColor: "rgba(30,30,30,1)",
            //   fontSize: 13,
            // },
            // minor: {
            //   // override de style, sinon hérité automatiquement
            //   fontColor: "rgba(30,30,30,0.9)",
            //   fontSize: 11,
            // },

            reverse: false, // mirroir haut-bas

            // min:  => pour faire ça à la main
            // max:
            beginAtZero: true, // sinon auto
            maxTicksLimit: 20, // nombre max de ticks sur l'axe
            stepSize: 1, // écart entre les ticks
          },

          gridLines: {
            // lignes horizontales
            display: true,
            color: "rgba(0,0,0,0.1)",
            lineWidth: 1,
            drawBorder: true, // bord entre l'axe et l'aire centrale
            drawOnChartArea: true, // zone centrale
            drawTicks: true, // ticks sur l'axe
            tickMarkLength: 10, // longueur du tick
            zeroLineWidth: 2, // ligne de la première valeur : marche pas ?
            zeroLineColor: "rgba(0,0,0,1)",
          },

          scaleLabel: {
            display: true, // titre de l'axe ua niveau de l'axe
            labelString: "axe gauche", // texte du titre + font options (voir ticks)
          },
        },
        {
          // si besoin d'une 2e échelle (tag les dataset avec yAxisID)
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            // lignes tracées sur l'aire de la courbe
            display: true,
            drawOnChartArea: false, // désactive le tracé au milieu (mais pas sur les bords)
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Line data={data} options={options} />;
};

export default GraphExample;
