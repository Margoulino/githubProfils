$(document).ready(function(){
  $('#searchUser').on('keyup', function(e) {
    let username = e.target.value;


    // Requète vers Github
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'e67365b6cb3afaf3836d',
        client_secret:'2016bbfad525f5c3fe2cded94fa0defc6cbc14cb'
      }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'e67365b6cb3afaf3836d',
          client_secret:'2016bbfad525f5c3fe2cded94fa0defc6cbc14cb',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="card">
            <div class="card-body">
                <div class="row">
                  <div class="col-md-7">
                    <a href="${repo.html_url}"><h3 class="card-title">${repo.name}</h3></a>Desc : <br />${repo.description}
                  </div>

                  <div class="col-md-3">
                    <span class="badge badge-primary">Dépots public : ${repo.forks_count}</span>
                    <span class="badge badge-info">Gists public : ${repo.watchers_count}</span>
                    <span class="badge badge-success">Followers : ${repo.stargazers_count}</span>
                  </div>

                  <div class="col-md-2">
                    <a href="${repo.html_url}" target="_blank" class="btn btn-primary btn-block">Dépot</a>
                  </div>

                </div>
              </div>
            </div>
            <br />
            `)
        });
      });
      $('#profile').html(`
        <div class="card">
          <h3 class="card-header">${user.name}</h3>
          <div class="card-body">
            <div class="row">
              <div class="col-md-3">
                <img class="img-thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block boop" href="${user.html_url}" role="button">Voir le profil</a>
              </div>
              <div class="col-md-9">
                <span class="badge badge-primary">Dépots public : ${user.public_repos}</span>
                <span class="badge badge-info">Gists public : ${user.public_gists}</span>
                <span class="badge badge-success">Followers : ${user.followers}</span>
                <span class="badge badge-danger">Following : ${user.following}</span>
                <br /><br />
                <ul class="list-group">
                  <li class="list-group-item">Entreprise : ${user.company}</li>
                  <li class="list-group-item">Site web : ${user.website}</li>
                  <li class="list-group-item">Localisation : ${user.location}</li>
                  <li class="list-group-item">Membre depuis : ${user.created_at}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h3 class="page-header">Derniers dépots :</h3>
        <div id="repos">

        </div>
        `)
    });
  });
});
