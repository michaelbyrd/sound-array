class HomeController < ApplicationController
  def index
    @frequencies = [261.625565, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88]
  end
end
