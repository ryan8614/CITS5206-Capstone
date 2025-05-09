'use client';

import React from 'react';

const Deanary = () => (
<!DOCTYPE html>

<html lang="en">
<head><script src="https://cdn.tailwindcss.com"></script>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>


<title>Deanery-LVL 2</title>
</head>
<body>
<p class="h1 text-center">Deanery - LVL 2</p>
<div class="container-fluid px-4">
<!-- top row -->
<div class="container-fluid mt-2">
<div class="row flex-nowrap g-2">
<div class="col-auto">
<div class="room-box vertical-text" id="R284" style="height:72px; width:36px;">
<p class="room">284</p>
<p class="name">Kitchen</p>
</div>
</div>
<!-- 1 row 4 cols -->
<div class="col-auto room-box" id="R282">
<p class="room">282</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
<p class="key-locker">Key Locker<br/> 591619</p>
</div>
<div class="col-auto room-box" id="R281">
<p class="room">281</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
<p class="key-locker">Key Locker<br/> 591618</p>
</div>
<div class="col-auto room-box yellow-box" id="R280">
<p class="room">280</p>
<p class="name">VACANT</p>
<p class="key-locker">Key Locker<br/> 591617</p>
</div>
<div class="col-auto room-box me-5" id="R279">
<p class="room">279</p>
<p class="name">Meeting Room</p>
<p class="key-locker">Key Locker<br/> 591201</p>
</div>
<!-- 1 row 7 cols -->
<div class="col-auto room-box yellow-box" id="R277">
<p class="room">277</p>
<p class="name">Vacant</p>
<p class="key-locker">Key Locker<br/> 591616</p>
</div>
<div class="col-auto room-box" id="R276">
<p class="room">276</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
<p class="key-locker">Key Locker<br/> 591615</p>
</div>
<!-- Double 275 VACANT stacked in one column -->
<div class="col-1 d-flex flex-column" id="R275A">
<div class="room-box yellow-box">
<p class="room">275A</p>
<p class="name">VACANT</p>
</div>
<div class="room-box yellow-box" id="R275B">
<p class="room">275B</p>
<p class="name">VACANT</p>
</div>
</div>
<div class="col-auto room-box text-center d-flex align-items-center justify-content-cente">
<p class="room">Setting Area</p>
</div>
<div class="col-auto room-box" id="R275C">
<p class="room">275C</p>
<p class="name">{name}</p>
<p class="key-locker">Key Locker<br/> 591614</p>
</div>
<div class="col-auto room-box" id="R274">
<p class="room">274</p>
<p class="name">{name}</p>
<p class="key-locker">Key Locker<br/> 591614</p>
</div>
<div class="col-auto room-box yellow-box" id="R273">
<p class="room">273</p>
<p class="name">Vacant</p>
<p class="key-locker">Key Locker<br/> 591613</p>
</div>
</div>
</div>
<i class="fa-solid fa-restroom fa-3x px-5"></i>
<!-- bottom row -->
<div class="container-fluid mt-2">
<div class="row flex-nowrap g-2">
<!-- Print Room -->
<div class="col-1">
<div class="room-box" id="R286">
<p class="room">286</p>
<p class="name">Print Room</p>
<p class="key-locker">Key Locker<br/>591201</p>
<p class="ptr">PTR 398</p>
<p class="printer-serial">Printer Serial<br/>#SAA2J041014148</p>
</div>
</div>
<!--  2 rows, 3 columns -->
<div class="col-2">
<div class="row">
<div class="col-4">
<div class="room-box" id="R278A">
<p class="room">278A</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-4 px-0">
<div class="room-box" id="R278B">
<p class="room">278B</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-4 ps-0">
<div class="room-box" id="R278C">
<p class="room">278C</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-4">
<div class="room-box" id="R278F">
<p class="room">278F</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-4 px-0">
<div class="room-box" id="R278G">
<p class="room">278G</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-4 ps-0">
<div class="room-box" id="R278H">
<p class="room">278H</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
</div>
</div>
<!-- 2 rows, 4 columns -->
<div class="col-3">
<div class="row">
<div class="col-3 pe-0">
<div class="room-box" id="R278D">
<p class="room">278D</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-3 ps-0">
<div class="room-box" id="R278E">
<p class="room">278E</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-3 pe-0">
<div class="room-box" id="R278L">
<p class="room">278L</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-3 ps-0">
<div class="room-box" id="R278M">
<p class="room">278M</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-3 pe-0">
<div class="room-box" id="R278I">
<p class="room">278I</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-3 ps-0">
<div class="room-box" id="R278J">
<p class="room">278J</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-3 pe-0">
<div class="room-box" id="R278K">
<p class="room">278K</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
<div class="col-3 ps-0">
<div class="room-box" id="R278N">
<p class="room">278N</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
</div>
</div>
</div>
</div>
<!-- Seating Area -->
<div class="col-auto">
<div class="room-box text-center d-flex align-items-center justify-content-center" style="height:96px">
<p class="name">Seating Area</p>
</div>
</div>
<div class="col-1" style="position: relative; z-index: 1;">
<div class="room-box flex-column text-center d-flex align-items-center justify-content-center rounded-pill" style="position: relative;height:96px; width:100px;top: 50%;">
<div class="name">Boardroom</div>
<div class="key-locker">Key Locker<br/>591612</div>
</div>
</div>
<div class="col-auto room-box" style="height:96px">
<p class="name">Vacant</p>
<p class="key-locker">Key Locker<br/>591201</p>
</div>
<div class="col-auto room-box" style="height:96px">
<p class="room">271</p>
<p class="name">Vacant</p>
<p class="key-locker">Key Locker<br/>591611</p>
</div>
<div class="col-auto room-box" style="height:96px">
<p class="room">270</p>
<p class="name">{name}</p>
<p class="ext">{ext}</p>
<p class="key-locker">Key Locker<br/>591610</p>
</div>
</div>
</div>
</div>
<script crossorigin="anonymous" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
<!-- font-awesome link -->
<script crossorigin="anonymous" src="https://kit.fontawesome.com/d5165f1477.js"></script>
</body>
</html>
);

export default Deanary;
