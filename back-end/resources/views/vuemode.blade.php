<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<title> dashboard</title>

<!-- Custom fonts for this template-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link
href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
rel="stylesheet">

<!-- Custom styles for this template-->
<link href="{{ asset('css/sb-admin.min.css')}}" rel="stylesheet">

</head>

<body id="page-top">

<div id="app"
>


<!-- Page Wrapper -->
<div id="wrapper">

<!-- Sidebar -->
<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">



<!-- Nav Item - Dashboard -->
<li class="nav-item  active">
<a class="nav-link " >
<i class="fas fa-university"></i>
<span> Gestion & Administration des examens</span></a>
</li>
<!-- 
 Divider
<hr class="sidebar-divider"> -->
<!-- Nav Item - Dashboard --> 
 <li class="nav-item @click=active">
<router-link class="nav-link" to="index.html">
<i class="fas fa-home"></i>
<span>Dashboard</span></a>
</li>


<hr class="sidebar-divider">

<li class="nav-item">
<link className="nav-link collapsed" to="/" data-target="#collapseTwo"
aria-expanded="true" aria-controls="collapseTwo">
<i class="fas fa-file-edit"></i>
<span>Examens</span> 
</a> 
</li> 