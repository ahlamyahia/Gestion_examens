<!-- resources/views/welcome.blade.php -->

@extends('layouts.app')

@section('content')

<div class="container">
    <h1>Liste des salles</h1>

    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Capacité</th>
                <th scope="col">Nb surveillant</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($salles as $index => $salle)
                <tr>
                    <th scope="row">{{ $index + 1 }}</th>
                    <td>{{ $salle->name }}</td>
                    <td>{{ $salle->capacite }}</td>
                    <td>{{ $salle->nombresSurveillant }}</td>
                    <td>
                <!-- Utilisation des icônes dans votre HTML -->
<!-- Utilisation de boutons personnalisés avec des icônes Font Awesome -->
<button type="button" class="btn btn-primary" onclick="redirigerModification('{{ $salle->id }}')">modifier</button>

<button type="button" class="btn btn-danger"  onclick="deleteSalle('{{ $salle->id }}')">supprimer</button>
<!-- Vue de modification pour la salle spécifique -->
<div id="vuemode{{ $salle->id }}" style="display:none;">
                            
</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection

<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<!-- Inclure SweetAlert -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<script>
  
    function deleteSalle(id) {
    axios.delete('api/salles/' + id)
      .then(res => {
        Swal.fire("", "Salle supprimée!", "success");
        // Mettez à jour la liste des salles après la suppression si nécessaire
        location.reload(); // Vous pouvez recharger la page pour mettre à jour la liste des salles
      })
      .catch(error => {
        Swal.fire("Erreur", "Une erreur s'est produite lors de la suppression de la salle.", "error");
        console.error('Erreur lors de la suppression de la salle', error);
      });
  }

  function redirigerModification(idSalle) {
        // Redirigez l'utilisateur vers la vue de modification spécifique
        window.location.href = '{{ route("vuemode", ["id" => ":id"]) }}'.replace(':id', idSalle);
    }


  </script>

<hr class="sidebar-divider">
<li class="nav-item">
<link to="/salles" class="nav-link collapsed"  data-target="#collapseTwo"
aria-expanded="true" aria-controls="collapseTwo">
<i class="fas fa-archway"></i>
<span>Salles</span>
</link>
</li>
</hr>

          


