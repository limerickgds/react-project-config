<#escape x as x?html>
<@compress>
<!DOCTYPE html>
<html>
  <head>
    <#include "../wrap/common.ftl">
    <#include "../wrap/var.ftl">
    <title>test</title>
    <title>test</title>
    <@css/>
    <meta http-equiv="content-type" content="text/html" charset="utf-8">
  </head>
  <body>
    <div class="">
      测试 <span>${name}</span>
    </div>
    <div class="" id="side">
    </div>
    <div class="todoapp" id="root">
    </div>
    <@javascript/>
    <!-- build:js -->
    <!-- endbuild -->
  </body>
</html>
</@compress>
</#escape>
