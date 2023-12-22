export const portfolio = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    body {
        margin: 0;
    }

    .repeaters-10-wrapper .container {
        margin: 0 auto;
        max-width: 1300px;
        padding: 50px;
    }

    .repeaters-10-wrapper .common-heading {
        font-family: Poppins;
        font-weight: 600;
        margin: 10px 0;
    }

    .repeaters-10-wrapper .common-text {
        font-family: 'Avenir';
        font-weight: 500;
        line-height: 25px;
        font-size: 15px;
        margin: 10px 0;
    }

    .repeaters-10-wrapper .common-img {
        width: 100% !important;
        height: fit-content;
    }

    .repeaters-10-wrapper .grid-display {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
        margin-bottom: 40px;
    }

    .repeaters-10-wrapper .grid-display .col img {
        width: 100%;
    }

    .repeaters-10-wrapper .grid-display .col .card-data {
        text-align: start;
    }

    .repeaters-10-wrapper .grid-display .col .card-data a {
        text-decoration: none;
        color: #000000;
        transition: 0.2s;
    }

    .repeaters-10-wrapper .grid-display .col .card-data .icon-right {
        display: flex;
        justify-content: end;
    }

    .repeaters-10-wrapper .grid-display .col .card-data img {
        width: 15px;
    }

    .repeaters-10-wrapper .grid-display .col .card-data a:hover {
        color: #686868;
    }

    .repeaters-10-wrapper .container .main-col {
        text-align: center;
        margin-bottom: 20px;
        font-size:x-large;
    }

    .repeaters-10-wrapper .container .main-col button {
        padding: 13px 30px;
        letter-spacing: 1px;
        background: #000000;
        color: #fff;
        border: 1px solid;
        border-radius: 30px;
        font-family: poppins;
        font-weight: 400;
        margin: 10px 0 30px 0;
        cursor: pointer;
        transition: 0.3s;
    }

    .repeaters-10-wrapper .container .main-col button:hover {
        background: #ffffff;
        color: #000000;
        border: 1px solid
    }

    .repeaters-10-wrapper .container .grid-display button {
        padding: 10px 18px;
        letter-spacing: 1px;
        background: transparent;
        color: #000000;
        border: 1px solid;
        border-radius: 30px;
        font-family: poppins;
        font-size: 12px;
        font-weight: 400;
        cursor: pointer;
        transition: 0.3s;
        margin-top: 20px;
    }

    .repeaters-10-wrapper .container .grid-display button:hover {
        background: #000000;
        color: #ffffff;
        border: 1px solid
    }

    .grid-display-main .main-col .common-text {
        font-size: 20px;
        margin: 30px 0;
        line-height: 40px;
    }

    .grid-display-main .main-col .common-heading {
        font-size: 40px;
    }



    @media (max-width: 1000px) {
        .repeaters-10-wrapper .grid-display {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .grid-display-main .main-col .common-heading {
            font-size: 30px;
        }

        .repeaters-10-wrapper .grid-display {
            grid-template-columns: repeat(1, 1fr);
        }
    }
  </style>
  <div class="repeaters-10-wrapper">
    <div class="container">
        <div class="main-col">
            <h1 class="common-heading">My Portfolio</h1>
        </div>
        <div class="repeater grid-display">
            <div class="repeater-item col col-1">
                <img class="common-img" src="project1.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project2.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project3.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project4.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project5.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project6.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project2.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project4.png"/>
            </div>
            <div class="repeater-item col col-1">
                <img class="common-img" src="project5.png"/>
            </div>
        </div>
    </div>
  </div>
`