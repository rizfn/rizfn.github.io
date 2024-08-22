---
marp: true
theme: uncover
math: mathjax
paginate: true
_paginate: skip
backgroundImage: url('fig/KU5.png')
backgroundSize: contain
style: |
        .columns {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.6rem;
        }
        h1, h2, h3, h4, h5, h6, strong {
          color: #400000;
        }
        .caption {
          font-size: 0.5em;
          line-height: 10%;
          letter-spacing: 0.01em;
          margin-top: -100px;
          margin-bottom: -100px;
        }

---


![bg 180% brightness:0.5 saturate:1](fig/julia_set.jpg)

<h1 style="color: #dfdfdf; text-shadow: 2px 2px 4px #400000;">Fractals: <br> The Language of Nature</h1>

$\\$

<span style="color: #dfdfdf; text-shadow: 2px 2px 4px #400000;">Riz Fernando Noronha</span>

--- 

## The Koch Curve

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/koch_construction/" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

## Try!!

$\\$

- Have you ever seen **fractals in nature**?

- Try to **construct your own fractal**, iteratively! Sketch a few iterations, and see what you get!

---

## Fractals in Nature!!

![height:500px](fig/IUP/Baobab_Tree_at_Vasai_Fort.jpg) ![height:500px](fig/IUP/Romanesco_broccoli_(Brassica_oleracea).jpg)

---

![height:600px](fig/IUP/yemen_dry_river_valleys.jpg)

---

## ~~Defining~~ Describing a fractal

- Self-similarity
- Detailed structure at small scales
- "Irregularity" 

![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_00_mandelbrot_set.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_01_head_and_shoulder.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_02_seehorse_valley.jpg) ![height:200px](fig/IUP/mandel_zoom/Mandel_zoom_03_seehorse.jpg)


---

### Measuring Length:

- We can use a line!

![height:400px](fig/IUP/CircleMovie.gif) ![height:400px](fig/IUP/PolyGraph.gif)

---

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/koch_measure/length.html" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

### Length isn't enough?

- A disc has infinite length!
- We measure an 'area' instead.

![height:400px](fig/IUP/pin_head_curve.png)

---

<iframe width="auto" height="1000px" src="https://rizfn.github.io/fractalsPresentation/koch_measure/area.html" style="border: 1px solid #cccccc" frameborder=0>
</iframe>

---

- Length measures things in **1D**.
  - Objects >1D have $L=\infty$

- Area measures things in **2D**.
  - Objects <2D have $A=0$

$$\\$$

- The curve has $L=\infty$ and $A=0$!
- Dimesion $1 < D < 2$ !?

![height:200px](fig/IUP/koch.png)

---

## Intended Learning Outcomes

$\\$

After this lesson, the participants should be able to

- *Identify* fractals in nature
- *Characterize* qualities that make a fractal
- *Describe* why a fractional dimension could be necessary to measure such objects

