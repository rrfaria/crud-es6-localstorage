Feature: Test open page
  I will test open app page

  Scenario: Try open the initial page
    Given the initial page
    And there is the content table in body
    Then I should have a title "Projeto Crud - LocalStorage" on page
