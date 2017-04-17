Feature: Test a crud action
  I will test open app page
  Check if there is a table
  check if all fields is there
  check if there is a button to salve data
  check if crud is running correctly

  Background: Try open the initial page
    Given the initial page

  Scenario: check If there are all elements
    When there is a title "Projeto Crud - LocalStorage"
    And there are some field Named "txtFullname","txtCpf","txtTelephone","txtAddress","txtComplement" ,"uplImage" and a button "btnSave"
    And there is the content table "tablerows"
    Then Should exists 2 panels

  Scenario: Try add new user
    When click on image "uplImage" to upload file
    And Fill those fields "txtFullname" with "Usertest","txtCpf" with a validated cpf "62014368392","txtTelephone" with phone "11 94323-0938"
    When start fill "txtAddress" with "Rua 3" should show google places suggestion an address
    And click in first Suggestion at field "txtAddress"
    And On field "txtComplement" fill with a text "house 1"
    And Click submit
    Then There is a new user added