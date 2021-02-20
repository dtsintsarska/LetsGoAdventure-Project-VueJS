<template>
   <footer>
      <p>All Rights Reserved © Let's Go Adventure</p>
      <ul class="social">
        <li>Follow as:</li>
        <li>
          <a href="http://www.facebook.com">
           <i class="fab fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="http://www.instagram.com">
            <i class="fab fa-instagram"></i>
          </a>
        </li>
        <li>
          <a href="http://www.twitter.com">
           <i class="fab fa-twitter"></i>
          </a>
        </li>
      </ul>
    </footer>
</template>

<script>
export default {

}
</script>

<style>

footer {
    background: #3498b9;
    padding: 0;
    margin: 0;
}

footer p {
    display: inline-block;
    width: 25%;
    text-align: right;
    color: snow;
    padding-bottom: 0%;
}

footer ul {
    display: inline-block;
    width: 60%;
    text-align: right;
}

footer ul li {
    display: inline-block;
    padding-right: 1%;
}

footer>ul li a i {
    border: 1px solid #5a7c8a;
    border-radius: 50%;
    padding: 5px;
    display: inline-block;
}

footer ul li a:hover {
    color: black;
}

.social li {
    color: snow;
}

.social li a i {
    border: 1px solid snow;
    border-radius: 50%;
    padding: 8px;
    color: snow;
}

</style>