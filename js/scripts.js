$(document).ready(function() {
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    var i = 0;
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  var board = {
    name: 'Tablica Kanban',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };

  function Column(name) {
    var self = this; 

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
    // TWORZENIE ELEMENTÓW SKŁADOWYCH KOLUMNY
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-list');
      var $columnDelete = $('<button>').addClass('btn-delete').text('x');
      var $columnAddCard = $('<button>').addClass('add-card').text('+ Add card');

    // PODPINANIE ODPOWIEDNICH ZDARZEŃ
      $columnDelete.click(function() {
        self.removeColumn();
      });

      $columnAddCard.click(function(event) {
        self.addCard(new Card(prompt("Name your card:")));
      });

    // KONSTRUOWANIE ELEMENTU KOLUMNY
      $column.append($columnTitle)
        .append($columnDelete)
        .append($columnAddCard)
        .append($columnCardList);

    // ZWRACANIE STWORZONEJ  KOLUMNY
      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  function Card(description) {
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard(); //

    function createCard() {
      // TWORZENIE KLOCKÓW
      var $card = $('<li>').addClass('card');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('btn-delete').text('x');

    // PRZYPIĘCIE ZDARZENIA
      $cardDelete.click(function(){
      self.removeCard();
      });

    // SKŁADANIE I ZWRACANIE KARTY
      $card.append($cardDelete)
        .append($cardDescription);

      return $card;
    }
  }

    Card.prototype = {
      removeCard: function() {
      this.$element.remove();
      }
    }


  function initSortable() {
    $('.column').sortable({
      connectWith: '.column',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }

  $('.create-column').click(function(){
    var name = prompt('Name your column:');
    var column = new Column(name);
    board.addColumn(column);
  });

  // TWORZENIE KOLUMN
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  // DODAWANIE KOLUMN DO TABLICY
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // TWORZENIE NOWYCH EGZEMPLARZY KART
  var card1 = new Card('Task to do');
  var card2 = new Card("I'm doing it right now");
  var card3 = new Card('Finally done');

  // DODAWANIE KART DO KOLUMN
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);
});